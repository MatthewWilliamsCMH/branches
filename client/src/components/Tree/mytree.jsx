import React, { useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
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

// const DELETE_PERSON = gql`
// mutation DeletePerson(
//     $deletePersonId: ID!
//     ) {
//     deletePerson(id: $deletePersonId) {
      
//     }
//   }
//     `;

const Tree = () => {
  const divRef = useRef(null);
  const treeRef = useRef(null);
  // Fetch the data from your GraphQL server
  const { loading, error, data } = useQuery(GET_PERSONS);

    useEffect(() => {
        if (!loading && !error && data) {
            // Map the data to the format expected by the FamilyTree component
            let treePersons = data.persons.map((person) => ({
                id: person.id, // Should be a string
                pids: person.pids, // Array of strings
                fid: person.fatherId || null, // String or null
                mid: person.motherId || null, // String or null
                name: `${person.firstName} ${person.lastName}`,
                gender: person.gender.toLowerCase(),
                img: person.img || '',
                dateOfBirth: person.dateOfBirth ? new Date(Number(person.dateOfBirth)).toISOString().split('T')[0] : null,
                birthPlace: person.birthPlace,
                dateOfDeath: person.dateOfDeath ? new Date(Number(person.dateOfDeath)).toISOString().split('T')[0] : null,
                burialSite: person.burialSite
            }));    

      console.log(treePersons);
      // treePersons.shift()
      // persons = [{ id: 'xyz', pids: [], name: "Amber McKenzie", gender: "female" },
      // { id: 'abc', pids: [undefined], name: "Ava Field", gender: "male" },
      // { id: 'def', mid: 'xyz', fid: 2, name: "Peter Stevens", gender: "male" }]

            // Initialize FamilyTree with the fetched data
            new FamilyTree(divRef.current, {
                nodes: treePersons, // Pass the mapped persons as nodes
                mode: 'dark',  // Dark mode (optional)
                template: 'tommy', // Template type
                nodeTreeMenu: true, // Enable tree menu
                 nodeBinding: {
                    field_0: 'name', // Display name
                     img_0: 'img',    // Display image
                 },
                editForm: {
                    titleBinding: "name",
                    photoBinding: "img",
                    // generateElementsFromFields: false,
                    elements: [
                        { type: 'textbox', label: 'Full Name', binding: 'name' },
                        { type: 'textbox', label: 'Gender', binding: 'gender' },
                        [
                            { type: 'date', label: 'Birth Date', binding: 'dateOfBirth' },
                            { type: 'date', label: 'Death Date', binding: 'dateOfDeath' }
                        ],
                        [
                            { type: 'textbox', label: 'Birth Place', binding: 'birthPlace' },
                            { type: 'textbox', label: 'Burial Site', binding: 'burialSite' }
                        ],
                        // { type: 'textbox', label: 'Photo Url', binding: 'ImgUrl', btn: 'Upload' },
                    ],
                    buttons: {
                        edit: { 
                            icon: FamilyTree.icon.edit(24, 24, '#fff'),
                            text: 'Edit',
                            hideIfEditMode: true,
                            hideIfDetailsMode: false
                        },
                        share: null,
                        pdf: null,
                        remove: null
                    }
                }
            });
        }
    }, [loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="tree" ref={divRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default Tree;
