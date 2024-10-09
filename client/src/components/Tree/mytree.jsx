import React, { useEffect, useRef } from 'react';
import FamilyTree, { nodeCircleMenu } from "@balkangraph/familytree.js";

// FamilyTree.templates.tommy.nodeCircleMenuButton = FamilyTree.templates.tommy_female.nodeCircleMenuButton = FamilyTree.templates.tommy_male.nodeCircleMenuButton = {
//     radius: 25,
//     x: 230,
//     y: 60,
//     color: '#fff',
//     stroke: '#aeaeae'
// };

const Tree = ({ nodes }) => {
    const divRef = useRef(null);

    useEffect(() => {
        const family = new FamilyTree(divRef.current, {
            nodes: nodes,
            mode: 'dark',
            template: 'tommy',
            // roots: [0],
            nodeTreeMenu: true,
            nodeBinding: {
                field_0: 'name',
                img_0: 'img'
            },
            editForm: {
                // titleBinding: "name",
                // photoBinding: "img",
                // generateElementsFromFields: true,
                // addMore: 'Add more elements',
                // addMoreBtn: 'Add element',
                // addMoreFieldName: 'Element name',
                elements: [
                    { type: 'textbox', label: 'Full Name', binding: 'name' },
                    { type: 'textbox', label: 'Gender', binding: 'gender' },
                    [
                        { type: 'date', label: 'Birth Date', binding: 'dateOfBirth' },
                        { type: 'date', label: 'Death Date', binding: 'dateOfDeath' }
                    ],
                    { type: 'textbox', label: 'Birth Location', binding: 'birthPlace' },
                    { type: 'textbox', label: 'Burial Site', binding: 'burialSite'}
                    // { type: 'textbox', label: 'Photo Url', binding: 'ImgUrl', btn: 'Upload' },
                ],
                // elements: [
                //     { type: 'textbox', label: 'Full Name', binding: 'name' },

                //     [
                //         { type: 'string', label: 'Birth Date', binding: 'dateOfBirth' },
                //         { type: 'date', label: 'Death Date', binding: 'dateOfDeath' },
                //         // { type: 'string', label: 'Birth Location', binding: 'birthPlace' },
                //         // { type: 'string', label: 'Death Location', binding: 'burialSite'}
                //         // { type: 'date', label: 'Birth Date', binding: 'birthDate' },
                //         // { type: 'date', label: 'Death Date', binding: 'deathDate' }
                //     ],
                //     // [
                //     //     { type: 'select', options: [{ value: 'bg', text: 'Bulgaria' }, { value: 'ru', text: 'Russia' }, { value: 'gr', text: 'Greece' }], label: 'Country', binding: 'country' },
                //     //     { type: 'textbox', label: 'City', binding: 'city' },
                //     // ],
                //     { type: 'textbox', label: 'Photo Url', binding: 'ImgUrl', btn: 'Upload' },
                //     // { type: 'textbox', label: 'Phone', binding: 'Mobile' },
                // ],
                buttons: {
                    edit: { 
                        icon: FamilyTree.icon.edit(24, 24, '#fff'),
                        text: 'Edit',
                        hideIfEditMode: true,
                        hideIfDetailsMode: false
                    },
                    share: null,
                    pdf: null,
                    // share: {
                    //     icon: FamilyTree.icon.share(24, 24, '#fff'),
                    //     text: 'Share'
                    // },
                    // pdf: {
                    //     icon: FamilyTree.icon.pdf(24, 24, '#fff'),
                    //     text: 'Save as PDF'
                    // },
                    remove: null
                }
            }

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
        });

        // Clean up function if needed
        return () => {
            // Clean up logic here if necessary
        };
    }, [nodes]);

    return (
        <div id="tree" ref={divRef}></div>
    );
};

export default Tree;