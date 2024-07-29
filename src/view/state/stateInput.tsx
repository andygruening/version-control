import {useEffect, useState} from "react";
import InputLabel from "../elements/input.label";
import {useStateMachine} from "../../stateMachine/stateMachine.context";
import {SetValueCommand} from "../../stateMachine/commands/setValue.command";
import {RemoveValueCommand} from "../../stateMachine/commands/removeValue.command";

interface StateInputProps {
    stateKey: string;
}

function StateInput(props: StateInputProps) {
    const {state, executeCommand} = useStateMachine();
    const [value, setValue] = useState<string>(state[props.stateKey]);

    useEffect(() => {
        setValue(state[props.stateKey]);
    }, [props.stateKey, state]);

    return (
        <div className={'layout horizontal gap'}>
            <InputLabel label={props.stateKey} value={value} placeholder={'Enter value...'} onChange={v => {
                setValue(v);
            }}/>
            <button onClick={() => executeCommand(new SetValueCommand(props.stateKey, value))}>
                <span className={'fa-solid fa-upload'}/>
            </button>
            <button onClick={() => executeCommand(new RemoveValueCommand(props.stateKey))}>
                <span className={'fa-solid fa-trash'}/>
            </button>
        </div>
    )
}

export default  StateInput;