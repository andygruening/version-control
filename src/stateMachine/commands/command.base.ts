import {State} from "../stateMachine.model";

export abstract class CommandBase {
    abstract Execute(state: State): boolean;
}