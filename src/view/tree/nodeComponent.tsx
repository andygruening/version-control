import DrawLine from "./drawLine";
import TreeNode from "./treeNode";
import {NodePosition} from "./tree.model";

function NodeComponent(props: NodePosition) {
    return (
        <div style={{
            position: 'absolute',
            top: props.y,
            left: props.x,
        }}>
            <DrawLine x1={(props.x || 0)}
                      y1={(props.y || 0)}
                      x2={(props?.parent?.x || 0)}
                      y2={(props?.parent?.y || 0)}
            />
            <TreeNode node={props.node} x={props.x} y={props.y}/>
        </div>
    )
}

export default NodeComponent;