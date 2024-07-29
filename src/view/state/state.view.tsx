import Header from "../elements/header.element";
import {useState} from "react";
import StateInput from "./stateInput";
import {useStateMachine} from "../../stateMachine/stateMachine.context";
import {SetValueCommand} from "../../stateMachine/commands/setValue.command";

function StateView() {
    const {state, executeCommand, clear} = useStateMachine();
    const [newKey, setNewKey] = useState<string>('');

    function addNewValue() {
        if (newKey === '') {
            return;
        }

        executeCommand(new SetValueCommand(newKey, ''));
        setNewKey('');
    }

    return (
        <div className={'layout vertical gap box'} style={{width: '600px', padding: 10}}>
            <Header title={'State'}/>
            <div className={'layout vertical gap flex-grow'}>
                {Object.keys(state).map((key, index) => {
                    return <StateInput key={index} stateKey={key}/>
                })}
            </div>
            <input value={newKey}
                   placeholder={'Enter key...'}
                   onChange={(e) => setNewKey(e.target.value)}
            />
            <button onClick={addNewValue}>
                Add New Value
            </button>
            <button onClick={clear}>
                Reset All
            </button>
        </div>
    )
}

export default StateView;