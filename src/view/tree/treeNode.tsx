import MergeButton from "./mergeButton";
import {NodePosition} from "./tree.model";
import {useStateMachine} from "../../stateMachine/stateMachine.context";
import {compressText} from "../../utils/text.utils";

function TreeNode(props: NodePosition) {
    const {nodeId, selectNode} = useStateMachine();

    return (
        <div className={'layout vertical center box'} style={{
            cursor: 'pointer',
            backgroundColor: props.node.id === nodeId ? 'var(--tint-color)' : 'var(--box-color)',
            position: 'absolute',
            width: '60px',
            height: '60px',
            padding: 5,
        }}
             onClick={() => selectNode(props.node.id)}
        >
            <p style={{fontWeight: 600, color: props.node.id === nodeId ? 'white' : 'black'}}>{compressText(props.node.id)}</p>
            <MergeButton nodeId={props.node.id}/>
        </div>
    );
}

export default TreeNode;