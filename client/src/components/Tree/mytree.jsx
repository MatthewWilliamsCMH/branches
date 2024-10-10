// import React, { useEffect, useRef } from 'react';
// import FamilyTree, { nodeCircleMenu } from "@balkangraph/familytree.js";

// FamilyTree.templates.tommy.nodeCircleMenuButton = FamilyTree.templates.tommy_female.nodeCircleMenuButton = FamilyTree.templates.tommy_male.nodeCircleMenuButton = {
//     radius: 25,
//     x: 230,
//     y: 60,
//     color: '#fff',
//     stroke: '#aeaeae'
// };

// const Tree = ({ nodes }) => {
//     const divRef = useRef(null);

//     useEffect(() => {
//         const family = new FamilyTree(divRef.current, {
//             nodes: nodes,
//             mode: 'dark',
//             template: 'tommy',
//             nodeTreeMenu: true,
//             nodeBinding: {
//                 field_0: 'name',
//                 img_0: 'img'
//             },
           /* nodeCircleMenu: {
                editNode: {
                    icon: FamilyTree.icon.edit(30, 30, '#aeaeae'),
                    text: "Edit node",
                    color: "white"
                },
                addSon: {
                    icon: FamilyTree.icon.son(30, 30, '#039BE5'),
                    text: "Add son",
                    color: "white"
                },
                addDaughter: {
                    icon: FamilyTree.icon.daughter(30, 30, '#F57C00'),
                    text: "Add daughter",
                    color: "white"
                }
            } */
      //  });

        // family.nodeCircleMenuUI.on('show', function (sender, args) {
        //     var node = family.getNode(args.nodeId);
        //     delete args.menu.father;
        //     delete args.menu.mother;
        //     delete args.menu.wife;
        //     delete args.menu.husband;

        //     if (FamilyTree.isNEU(node.mid)) {
        //         args.menu.mother = {
        //             icon: FamilyTree.icon.mother(30, 30, '#F57C00'),
        //             text: "Add mother",
        //             color: "white"
        //         };
        //     }
        //     if (FamilyTree.isNEU(node.fid)) {
        //         args.menu.father = {
        //             icon: FamilyTree.icon.father(30, 30, '#039BE5'),
        //             text: "Add father",
        //             color: "white"
        //         };
        //     }
        //     if (node.gender === 'male') {
        //         args.menu.wife = {
        //             icon: FamilyTree.icon.wife(30, 30, '#F57C00'),
        //             text: "Add wife",
        //             color: "white"
        //         };
        //     } else if (node.gender === 'female') {
        //         args.menu.husband = {
        //             icon: FamilyTree.icon.husband(30, 30, '#F57C00'),
        //             text: "Add husband",
        //             color: "white"
        //         };
        //     } else {
        //         args.menu.wife = {
        //             icon: FamilyTree.icon.wife(30, 30, '#F57C00'),
        //             text: "Add wife",
        //             color: "white"
        //         };
        //         args.menu.husband = {
        //             icon: FamilyTree.icon.husband(30, 30, '#039BE5'),
        //             text: "Add husband",
        //             color: "white"
        //         };
        //     }
        // });

        // family.nodeCircleMenuUI.on('click', function (sender, args) {
        //     var node = family.getNode(args.nodeId);

        //     console.log("Family: ", family);
        //     console.log("Sender: ", sender.obj.nodes);
        //     console.log("Args: ", args);
        //     console.log("Node: ", node);

        //     let newId = node.id + 2;
        //     console.log("New ID: ", newId)

        //     switch (args.menuItemName) {
        //         case "husband":
        //             family.addPartnerNode({ gender: 'male', pids: [args.nodeId] });
        //             break;
        //         case "wife":
        //             family.addPartnerNode({ gender: 'female', pids: [args.nodeId] });
        //             break;
        //         case "addSon":
        //             // Use the structure for the addDaughter, but with different id
        //             let son = {
        //                 id: newId, 
        //                 mid: node.id, 
        //                 fid: node.pid, 
        //                 name: "New Son", 
        //                 gender: 'male' 
        //             }
        //             console.log("Son: ", son);

        //             family.addChildNode({ 
        //                 id: newId, 
        //                 mid: node.parent.id, 
        //                 fid: node.parentPartner.id, 
        //                 name: "New Son", 
        //                 gender: 'male' 
        //             });
        //             family.center(newId); 
        //             break;
        //         case "addDaughter":

        //             family.addChildNode({ id: 6, mid: 1, fid: 2, name: "Mary", gender: "female" });
        //             family.center(6);    // is this an update/re-render function (?)
        //         //    family.addChildNode(args.nodeId, { gender: 'female', name: 'New Daughter' });
        //             break;
        //         case "mother":
        //             var data = { gender: 'female' };
        //             if (!FamilyTree.isNEU(node.fid)) {
        //                 data.pids = [node.fid];
        //             }
        //             family.addParentNode(args.nodeId, 'mid', data);
        //             break;
        //         case "father":
        //             var data = { gender: 'male' };
        //             if (!FamilyTree.isNEU(node.mid)) {
        //                 data.pids = [node.mid];
        //             }
        //             family.addParentNode(args.nodeId, 'fid', data);
        //             break;
        //         case "editNode": 
        //             family.editUI.show(args.nodeId);
        //             break;
        //         default:
        //     };
        // });

//         family.load([
//             { id: 1, pids: [2], name: "Amber McKenzie", gender: "female" },
//             { id: 2, pids: [1], name: "Ava Field", gender: "male" },
//             { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male" }
//         ]);

//         return () => {
//             // Clean up logic here if necessary
//         };
//     }, [nodes]);

//     return (
//         <div id="tree" ref={divRef}></div>
//     );
// };

// export default Tree;

// src/components/mytree.jsx

// src/components/mytree.jsx

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
    }
  }
`;

const Tree = () => {
    const divRef = useRef(null);

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
                dateOfBirth: person.dateOfBirth,
                birthPlace: person.birthPlace,
                dateOfDeath: person.dateOfDeath,
                burialSite: person.burialSite
            }));    
console.log(data)
            console.log(treePersons)
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
                        { type: 'date', label: 'Birth Date', binding: 'dateOfBirth' },
                        { type: 'textbox', label: 'Birth Place', binding: 'birthPlace' },
                        { type: 'date', label: 'Death Date', binding: 'dateOfDeath' },
                        { type: 'textbox', label: 'Burial Site', binding: 'burialSite' },
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

    return <div id="tree" ref={divRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Tree;
