import React, { useEffect, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import FamilyTree from '@balkangraph/familytree.js';
import './tree.css'

// Define your GraphQL query to fetch persons
const GET_PERSONS = gql`
  query GetPersons {
    persons {
      _id
      firstName
      lastName
      dateOfBirth
      dateOfDeath
      motherId
      fatherId
      gender
      pids
      img
      birthPlace
      burialSite
    }
  }
`;

// Define your GraphQL mutation to create a person
const CREATE_PERSON = gql`
  mutation CreatePerson(
    $firstName: String
    $lastName: String
    $gender: String!
    $fatherId: String
    $motherId: String
    $dateOfBirth: String
    $dateOfDeath: String
    $birthPlace: String
    $burialSite: String
    $img: String
  ) {
    createPerson(
      firstName: $firstName,
      lastName: $lastName,
      gender: $gender,
      fatherId: $fatherId,
      motherId: $motherId,
      dateOfBirth: $dateOfBirth,
      dateOfDeath: $dateOfDeath,
      birthPlace: $birthPlace,
      burialSite: $burialSite,
      img: $img
    ) {
      id
      firstName
      lastName
      dateOfBirth
      dateOfDeath
      gender
      birthPlace
      burialSite
      img
      fatherId
      motherId
      pids
    }
  }
`;

// Define the GraphQL mutation to update a person
const UPDATE_PERSON = gql`
  mutation UpdatePerson (
    $_id: String!
    $firstName: String
    $middleName: String
    $lastName: String
    $dateOfBirth: String
    $dateOfDeath: String
    $gender: String
    $birthPlace: String
    $burialSite: String
    $img: String
    $fatherId: String
    $motherId: String
    $pids: [String]
  ) {
    updatePerson(
      id: $_id
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      dateOfDeath: $dateOfDeath
      gender: $gender
      birthPlace: $birthPlace
      burialSite: $burialSite
      img: $img
      fatherId: $fatherId
      motherId: $motherId
      pids: $pids
    ) {
      id
      firstName
      lastName
      dateOfBirth
      dateOfDeath
      gender
      birthPlace
      burialSite
      img
      fatherId
      motherId
      pids
    }
  }
`;

const Tree = () => {
  const divRef = useRef(null);
  const treeRef = useRef(null);

  // Fetch the data from your GraphQL server
  const { loading, error, data, refetch } = useQuery(GET_PERSONS);
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [createPerson] = useMutation(CREATE_PERSON);

  useEffect(() => {
    if (!loading && !error && data) {
      // Map the data to the format expected by the FamilyTree component
      const treePersons = data.persons.map((person) => ({
        id: String(person._id),
        pids: person.pids,
        fid: person.fatherId || null,
        mid: person.motherId || null,
        name: `${person.firstName} ${person.lastName}`,
        gender: person.gender.toLowerCase(),
        img: person.img || '',
        dateOfBirth: person.dateOfBirth
          ? new Date(Number(person.dateOfBirth)).toISOString().split('T')[0]
          : null,
        birthPlace: person.birthPlace,
        dateOfDeath: person.dateOfDeath
          ? new Date(Number(person.dateOfDeath)).toISOString().split('T')[0]
          : null,
        burialSite: person.burialSite,
      }));

      const windowIsWide = window.innerWidth >= 780;

      // Initialize FamilyTree with the fetched data
      treeRef.current = new FamilyTree(divRef.current, {
        nodes: treePersons,
        mode: 'dark',
        template: 'tommy',
        nodeTreeMenu: true,
        miniMap: windowIsWide,
        enableSearch: windowIsWide,
        nodeBinding: {
          field_0: 'name',
          img_0: 'img',
        },
        editForm: {
          titleBinding: 'name',
          photoBinding: 'img',
          elements: [
            { type: 'textbox', label: 'Full Name', binding: 'name' },
            { type: 'textbox', label: 'Gender', binding: 'gender' },
            [
              { type: 'date', label: 'Birth Date', binding: 'dateOfBirth' },
              { type: 'date', label: 'Death Date', binding: 'dateOfDeath' },
            ],
            [
              { type: 'textbox', label: 'Birth Place', binding: 'birthPlace' },
              { type: 'textbox', label: 'Burial Site', binding: 'burialSite' },
            ],
            { type: 'textbox', label: 'Photo Url', binding: 'img', btn: 'Upload' },
          ],
          buttons: {
            edit: {
              icon: FamilyTree.icon.edit(24, 24, '#fff'),
              text: 'Edit',
              hideIfEditMode: true,
              hideIfDetailsMode: false,
            },
            share: null,
            pdf: null
          }
        }
      });

      treeRef.current.onUpdateNode(async (args) => {
        console.log('+++++ Updated node! ++++');
        console.log(args);


        if(args.addNodesData.length > 0) {
          const personData = args.addNodesData[0];
          const newPersonData = {
            _id: personData.id,
            firstName: personData.name.split(' ')[0] || null,
            lastName: personData.name.split(' ')[1] || null,
            gender: personData.gender,
            fatherId: personData.fid || null,
            motherId: personData.mid || null,
            pids: personData.pids || [],
          };

          try {
            const { data: newPerson } = await createPerson({
              variables: newPersonData
            });

            console.log('New person added:', newPerson.createPerson);

            // Now update firstPartner's document
            const updatePids = [
              ...(data.persons.find(person => person.id === personData.id)?.pids || []),
              newPerson.createPerson.id
            ];
            
            await updatePerson({
              variables: {
                _id: personData.id,
                pids: updatePids
              }
            });



            // Refresh the FamilyTree nodes after the mutation
            const { data: refetchedData } = await refetch(); // Refetch updated data
            const updatedTreePersons = refetchedData.persons.map(person => ({
              id: person._id,
              pids: person.pids,
              fid: person.fatherId || null,
              mid: person.motherId || null,
              name: `${person.firstName} ${person.lastName}`,
              gender: person.gender.toLowerCase(),
              img: person.img || '',
              dateOfBirth: person.dateOfBirth,
              birthPlace: person.birthPlace,
              dateOfDeath: person.dateOfDeath,
              burialSite: person.burialSite,
            }));

          treeRef.current.load(updatedTreePersons);
          } 
          catch (error) {
            console.error('Error creating person:', error);
          }
        }
        else if (args.updateNodesData.length > 0) {
          const updatedPersonData = {
            _id: args.updateNodesData[0].id,
            firstName: args.updateNodesData[0].name.split(' ')[0] || null,
            lastName: args.updateNodesData[0].name.split(' ')[1] || null,
            gender: args.updateNodesData[0].gender,
            img: args.updateNodesData[0].img || '',
            fatherId: args.updateNodesData[0].fid || null,
            motherId: args.updateNodesData[0].mid || null,
            pids: args.updateNodesData[0].pids || []
          };
    
          // Call the mutation to update the person
          try {
            const { data } = await updatePerson({
              variables: updatedPersonData
            });
            console.log('Person updated:', data.updatePerson);
  
            // Optionally, refresh the FamilyTree nodes after update
            const { data: refreshedData } = await refetch(); // Refetch updated data
            const refreshedTreePersons = refreshedData.persons.map(person => ({
              id: person.id,
              pids: person.pids,
              fid: person.fatherId || null,
              mid: person.motherId || null,
              name: `${person.firstName} ${person.lastName}`,
              gender: person.gender.toLowerCase(),
              img: person.img || '',
              dateOfBirth: person.dateOfBirth,
              birthPlace: person.birthPlace,
              dateOfDeath: person.dateOfDeath,
              burialSite: person.burialSite,
            }));
            treeRef.current.load(refreshedTreePersons);
          } 
          catch (error) {
            console.error('Error updating person:', error);
          }
        }
      });

      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
          // const response = await fetch('http://localhost:3001/assets', {
          const response = await fetch('/assets', {
            method: 'POST',
            body: formData,
          });


          if (!response.ok) {
            throw new Error('File upload failed');
          }

          const data = await response.json();
          return data.fileUrl;
        }
        catch (error) {
          console.error('Error uploading file: ', error);
          throw error;
        }
      }

      treeRef.current.editUI.on('element-btn-click', function() {
        FamilyTree.fileUploadDialog(async function(file) {
          if (currentDetailsIdRef) {
            try {
              const fileUrl = await uploadFile(file);
              const updatedPersonData = {
                updatePersonId: currentDetailsIdRef,
                img: fileUrl
              };
              const { data } = await updatePerson({
                variables: updatedPersonData
              });

              console.log ('Avatar updated: ', data.updatedPerson);

              // treeRef.current.updateNode({
              //   id: currentDetailsIdRef,
              //   img: fileUrl
              // });
            }
            catch (error) {
              console.error('Avatar update failed: ', error);
            }
          }
          else {
            console.error('Person ID not found');
          }
        });
      });

      let currentDetailsIdRef = null; // Use a local variable to store the ID


      // Capture the node ID when a node is clicked
      treeRef.current.onNodeClick((sender, args) => {
        currentDetailsIdRef = sender.node.id; // Update local variable
      });
    }
  }, [loading, error, data, createPerson, updatePerson, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id='tree' ref={divRef} />
  );
};

export default Tree;