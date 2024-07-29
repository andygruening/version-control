import {StateNode} from "../../stateMachine/stateMachine.model";

export interface NodePosition {
    parent?: NodePosition;
    node: StateNode;
    x: number;
    y: number;
}