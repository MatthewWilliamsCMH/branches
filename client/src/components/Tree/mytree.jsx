import React, { useEffect, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import FamilyTree from "@balkangraph/familytree.js";

// Define your GraphQL query to fetch persons
const GET_PERSONS = gql`
  query GetPersons {
    persons {
      id
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

// Define the GraphQL mutation to update a person
const UPDATE_PERSON = gql`
  mutation Mutation(
    $updatePersonId: ID!
    $firstName: String
    $middleName: String
    $lastName: String
    $dateOfBirth: String
    $dateOfDeath: String
    $gender: String
    $birthPlace: String
    $burialSite: String
    $img: String
    $fatherId: ID
    $motherId: ID
    $pids: [ID]
  ) {
    updatePerson(
      id: $updatePersonId
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
  const { loading, error, data } = useQuery(GET_PERSONS);
  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    if (!loading && !error && data) {
      // Map the data to the format expected by the FamilyTree component
      const treePersons = data.persons.map((person) => ({
        id: person.id,
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

      // Initialize FamilyTree with the fetched data
      treeRef.current = new FamilyTree(divRef.current, {
        nodes: treePersons,
        mode: 'dark',
        template: 'tommy',
        nodeTreeMenu: true,
        miniMap: true,
        nodeBinding: {
          field_0: 'name',
          img_0: 'img',
        },
        editForm: {
          titleBinding: "name",
          photoBinding: "img",
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
            { type: 'textbox', label: 'Photo Url', binding: 'img', btn: 'Upload' }
          ],
          buttons: {
            edit: {
              icon: FamilyTree.icon.edit(24, 24, '#fff'),
              text: 'Edit',
              hideIfEditMode: true,
              hideIfDetailsMode: false,
            },
            share: null,
            pdf: null,
            // remove: null,
          },
        },
      });

      treeRef.current.onUpdateNode(async (args) => {
        console.log('+++++ Updated node! ++++');
        console.log(args);

        // Extract data from args and map them to mutation variables
        const updatedPersonData = {
          updatePersonId: args.node.id,
          firstName: args.node.name.split(" ")[0],
          lastName: args.node.name.split(" ")[1],
          gender: args.node.gender,
          img: args.node.img || "",
          fatherId: args.node.fid || null,
          motherId: args.node.mid || null,
          pids: args.node.pids || [],
        };

        // Call the mutation to update the person
        try {
          const { data } = await updatePerson({
            variables: updatedPersonData,
          });
          console.log("Person updated:", data.updatePerson);

          // Optionally, refresh the FamilyTree nodes after update
          treeRef.current.load(treePersons);
        } catch (error) {
          console.error("Error updating person:", error);
        }
      });

      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
          const response = await fetch("http://localhost:3001/assets", {
            method: "POST",
            body: formData,
          });


          if (!response.ok) {
            throw new Error("File upload failed");
          }

          const data = await response.json();
          return data.fileUrl;
        }
        catch (error) {
          console.error("Error uploading file: ", error);
          throw error;
        }
      }

      treeRef.current.editUI.on("element-btn-click", function() {
        FamilyTree.fileUploadDialog(async function(file) {
          if (currentDetailsIdRef) {
            try {
              const fileUrl = await uploadFile(file);
              const updatedPersonData = {
                updatePersonId: currentDetailsIdRef,
                img: fileUrl
              };
//It's getting to here and then failing.
// console.log(updatedPersonData)
              const { data } = await updatePerson({
                variables: updatedPersonData
              });
            

              console.log ("Avatar updated: ", data.updatedPerson);

              treeRef.current.updateNode({
                id: currentDetailsIdRef,
                img: fileUrl
              });
            }
            catch (error) {
              console.error("Avatar update failed: ", error);
            }
          }
          else {
            console.error("Person ID not found");
          }
        });
      });

      let currentDetailsIdRef = null; // Use a local variable to store the ID
 

      // Capture the node ID when a node is clicked
      treeRef.current.onNodeClick((sender, args) => {
        currentDetailsIdRef = sender.node.id; // Update local variable
      });
    }
  }, [loading, error, data, updatePerson]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="tree" ref={divRef} /> //matthew moved sizing into css file
  );
};

export default Tree;

let currentDetailsId = null; // Use a local variable to store the ID