import React, { useEffect, useRef, useState } from 'react';
import FamilyTree from "@balkangraph/familytree.js";
import './tree.css';

const Tree = ({ nodes }) => {
    const divRef = useRef(null);
    const [familyTree, setFamilyTree] = useState(null);

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
        });

        setFamilyTree(family);

        family.load([
            { id: 1, pids: [2], name: "Amber McKenzie", gender: "female" },
            { id: 2, pids: [1], name: "Ava Field", gender: "male" },
            { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male" }
        ]);

        return () => {
            // Clean up logic here if necessary
        };
    }, [nodes]);

    // Function to delete all nodes by reloading an empty array
    const handleDeleteAllNodes = () => {
        if (familyTree) {
            familyTree.load([]); // Reload an empty array to remove all nodes
        }
    };

    return (
        <div className="tree-container">
            <div id="tree" ref={divRef}></div>
            <button onClick={handleDeleteAllNodes}>Cut Down the Tree</button>
        </div>
    );
};

export default Tree;