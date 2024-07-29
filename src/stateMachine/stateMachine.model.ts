import {CommandBase} from "./commands/command.base";

export interface StateNode {
    id: string;
    children: StateNode[];
    command: CommandBase | null;
}

export type State = {[key: string]: string}