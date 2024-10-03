import React, { useEffect, useRef } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

const Tree = ({ nodes }) => {
    const divRef = useRef(null);

    useEffect(() => {
        const family = new FamilyTree(divRef.current, {
            nodes: nodes,
            nodeBinding: {
                field_0: 'name',
                img_0: 'img'
            }
        });

        // Clean up function if needed
        return () => {
            // If FamilyTree has a method to destroy or clean up, call it here
            // family.clear(); // Example, if such method exists
        };
    }, [nodes]); // Run effect when nodes change

    return (
        <div id="tree" ref={divRef}></div>
    );
};

export default Tree;
