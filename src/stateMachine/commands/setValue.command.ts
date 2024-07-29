import {State} from "../stateMachine.model";
import {CommandBase} from "./command.base";

export class SetValueCommand extends CommandBase {
    key: string;
    value: string;

    constructor(key: string, value: string) {
        super();
        this.key = key;
        this.value = value;
    }

    Execute(state: State): boolean {
        state[this.key] = this.value;
        return true;
    }
}