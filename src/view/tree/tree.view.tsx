import {NodePosition} from "./tree.model";
import {useStateMachine} from "../../stateMachine/stateMachine.context";
import {StateNode} from "../../stateMachine/stateMachine.model";
import {useDrag} from "../../utils/useDrag";
import NodeComponent from "./nodeComponent";

function TreeView() {
    const {root} = useStateMachine();
    const {position, handleMouseDown, handleMouseMove, handleMouseUp} = useDrag();

    function collectNodeComponents(): NodePosition[] {
        let totalY = 0;
        const positions: NodePosition[] = [];

        function traverse(node: StateNode, depth: number, index: number, parent?: NodePosition): void {
            const position: NodePosition = {
                parent: parent,
                node: node,
                x: depth * 120,
                y: index * 120
            }

            positions.push(position);
            node.children.forEach((child, childIndex) => {
                if (childIndex > 0) {
                    totalY++;
                }

                traverse(child, depth + 1, totalY, position);
            });
        }

        traverse(root, 0, 0);
        return positions;
    }

    return (
        <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
            <div onMouseDown={handleMouseDown}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseUp}
                 style={{height: '100%'}}
            >
                <div style={{
                    position: 'relative',
                    transition: 'unset',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    backgroundColor: 'transparent',
                }}>
                    {collectNodeComponents().map((c, index) => {
                        return <NodeComponent key={index} node={c.node} parent={c.parent} x={c.x} y={c.y}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default TreeView;