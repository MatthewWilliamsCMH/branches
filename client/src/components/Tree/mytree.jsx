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
            nodeTreeMenu: true,
            nodeBinding: {
                field_0: 'name',
                img_0: 'img'
            },
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