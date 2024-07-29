import {useStateMachine} from "../../stateMachine/stateMachine.context";

function MergeButton(props: {nodeId: string}) {
    const {merge, canMerge} = useStateMachine();

    if (!canMerge((props.nodeId))) {
        return <></>
    }

    return (
        <button style={{position: "absolute", transformOrigin: '0 0', top: 15, left: -25}}
                onClick={(e) => {
                    e.stopPropagation();
                    merge(props.nodeId);
                }}>
            <span className={'fa-solid fa-merge'}/>
        </button>
    )
}

export default MergeButton;