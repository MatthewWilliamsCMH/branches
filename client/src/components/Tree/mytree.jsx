import React, { useEffect, useRef } from 'react';
import FamilyTree, { nodeCircleMenu } from "@balkangraph/familytree.js";


FamilyTree.templates.tommy.nodeCircleMenuButton = FamilyTree.templates.tommy_female.nodeCircleMenuButton = FamilyTree.templates.tommy_male.nodeCircleMenuButton = {

    radius: 25,
    x: 230,
    y: 60,
    color: '#fff',
    stroke: '#aeaeae'
};

const Tree = ({ nodes }) => {
    const divRef = useRef(null);



    useEffect(() => {
        const family = new FamilyTree(divRef.current, {
            nodes: nodes,
            mode: 'dark',
            template: 'tommy',
            nodeBinding: {
                field_0: 'name',
                img_0: 'img'
            },
            nodeCircleMenu: {
                // PDFProfile: {
                //     icon: FamilyTree.icon.pdf(30, 30, '#aeaeae'),
                //     text: "PDF Profile",
                //     color: "white"
                // },
        
                editNode: {
                    icon: FamilyTree.icon.edit(30, 30, '#aeaeae'),
                    text: "Edit node",
                    color: "white"
                },
                // addClink: {
                //     icon: FamilyTree.icon.link(30, 30, '#aeaeae'),
                //     text: "Add C link",
                //     color: '#fff',
                //     draggable: true
                // },
                // pet: {
                //     icon: FamilyTree.icon.teddy(30, 30, '#aeaeae'),
                //     text: "Add pet",
                //     color: "white"
                // }
            },
        });

        
        family.nodeCircleMenuUI.on('show', function (sender, args) {
            var node = family.getNode(args.nodeId);
            delete args.menu.father;
            delete args.menu.mother;
            delete args.menu.wife;
            delete args.menu.husband;
            if (FamilyTree.isNEU(node.mid)) {
                args.menu.mother = {
                    icon: FamilyTree.icon.mother(30, 30, '#F57C00'),
                    text: "Add mother",
                    color: "white"
                };
            }
            if (FamilyTree.isNEU(node.fid)) {
                args.menu.father = {
                    icon: FamilyTree.icon.father(30, 30, '#039BE5'),
                    text: "Add father",
                    color: "white"
                };
            }
            if (node.gender == 'male' ) {
                args.menu.wife = {
                    icon: FamilyTree.icon.wife(30, 30, '#F57C00'),
                    text: "Add wife",
                    color: "white"
                };
            }
            else if (node.gender == 'female') {
                args.menu.husband = {
                    icon: FamilyTree.icon.husband(30, 30, '#F57C00'),
                    text: "Add husband",
                    color: "white"
                };
            }
            else {
                args.menu.wife = {
                    icon: FamilyTree.icon.wife(30, 30, '#F57C00'),
                    text: "Add wife",
                    color: "white"
                };
                args.menu.husband = {
                    icon: FamilyTree.icon.husband(30, 30, '#039BE5'),
                    text: "Add husband",
                    color: "white"
                };
            }
        
        });
        

        family.nodeCircleMenuUI.on('click', function (sender, args) {
            var node = family.getNode(args.nodeId);
        
            switch (args.menuItemName) {
                case "husband":
                    family.addPartnerNode({ gender: 'male', pids: [args.nodeId] });
                    break;
                case "wife":
                    family.addPartnerNode({ gender: 'female', pids: [args.nodeId] });
                    break;
                case "pet":
                    family.addPartnerNode({ gender: 'pet', pids: [args.nodeId] });
                    break;
                case "mother":
                    var data = { gender: 'female' };
                    if (!FamilyTree.isNEU(node.fid)) {
                        data.pids = [node.fid];
                    }
                    family.addParentNode(args.nodeId, 'mid', data);
                    break;
                case "father":
                    var data = { gender: 'male' };
                    if (!FamilyTree.isNEU(node.mid)) {
                        data.pids = [node.mid];
                    }
                    family.addParentNode(args.nodeId, 'fid', data);
                    break;
                case "PDFProfile":
                    family.exportPDFProfile({
                        id: args.nodeId
                    });
                    break;
                case "editNode": family.editUI.show(args.nodeId);
                    break;
                default:
            };
        });
        
        family.nodeCircleMenuUI.on('drop', function (sender, args) {
            family.addClink(args.from, args.to).draw(FamilyTree.action.update);
        });
        
        family.nodeCircleMenuUI.on('mouseenter', function (sender, args) {
            if (args.menuItem.text == "Remove node") {
                var node = document.querySelector('[data-n-id="' + args.from + '"]');
                node.style.opacity = 0.5;
            }
        });
        
        family.nodeCircleMenuUI.on('mouseout', function (sender, args) {
            var node = document.querySelector('[data-n-id="' + args.from + '"]');
            node.style.opacity = 1;
        });

        family.load([
            { id: 1, pids: [2], name: "Amber McKenzie", gender: "female" },
            { id: 2, pids: [1], name: "Ava Field", gender: "male" },
            { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male" }
        ]);
        // Clean up function if needed
        return () => {
            // If FamilyTree has a method to destroy or clean up, call it here
            // family.clear(); // Example, if such method exists
        };
    }, [nodes]); // Run effect when nodes change

    return (
        <div id="tree" ref={divRef}>

        </div>
    );
};

export default Tree;
