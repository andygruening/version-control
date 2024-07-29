import {State} from "../stateMachine.model";
import {CommandBase} from "./command.base";

export class RemoveValueCommand extends CommandBase {
    key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }

    Execute(state: State): boolean {
        if (this.key in state) {
            delete state[this.key];
        }

        return true;
    }
}