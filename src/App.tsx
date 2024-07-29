import './styles/App.css';
import './styles/fa/styles/all.css';
import React from 'react';
import {StateMachineProvider} from "./stateMachine/stateMachine.context";
import StateView from "./view/state/state.view";
import TreeView from "./view/tree/tree.view";

function App() {
    function openRepository() {
        window.open('https://github.com/andygruening/version-control', '_blank');
    }

    return (
        <StateMachineProvider>
            <div className={'layout vertical gap'} style={{height: '100vh'}}>
                <div className={'layout vertical gap flex-grow'} style={{padding: 10}}>
                    <div className={'layout horizontal gap flex-grow'}>
                        <StateView/>
                        <TreeView/>
                    </div>
                    <button className={'layout horizontal redirect-button'} onClick={openRepository}>
                        <span className={'fa-brands fa-github'}/>
                    </button>
                </div>
            </div>
        </StateMachineProvider>
    );
}

export default App;
