import {createContext, useContext, useRef, useState} from "react";
import {StateNode, State} from "./stateMachine.model";
import {CommandBase} from "./commands/command.base";
import {uid} from "uid";

interface StateMachineContextData {
    root: StateNode;
    state: State;
    nodeId: string;
    clear(): void;
    executeCommand(command: CommandBase): void;
    merge(nodeId: string): void;
    canMerge(nodeId: string): boolean;
    selectNode(id: string): void;
}

const StateMachineContext = createContext<StateMachineContextData>({} as StateMachineContextData);

function createRootNode(): StateNode {
    return {
        id: uid(),
        children: [],
        command: null
    };
}

export function StateMachineProvider(props: {children: React.ReactNode}) {
    const root = useRef<StateNode>(createRootNode());
    const [state, setState] = useState<State>({});
    const [nodeId, setNodeId] = useState<string>(root.current.id);

    function clear() {
        root.current = createRootNode();
        setNodeId(root.current.id)
        constructState(root.current.id);
    }

    function executeCommand(command: CommandBase) {
        const nodeMap = collectNodesIntoMap(root.current);
        const newNode: StateNode = {
            id: uid(),
            children: [],
            command: command
        };

        nodeMap[nodeId].children.push(newNode)
        setNodeId(newNode.id)
        constructState(newNode.id);
    }

    function merge(id: string): void {
        const nodeMap = collectNodesIntoMap(root.current);
        if (!(id in nodeMap && findParent(root.current, id) in nodeMap)) {
            return;
        }

        const curNode = nodeMap[id];
        const parent = findParent(root.current, id);
        const parentNode = nodeMap[parent];
        const childIndex = parentNode.children.findIndex(n => n.id === id);
        parentNode.children.splice(childIndex, 1);

        let curId: string = parentNode.id;
        while (true) {
            const children = nodeMap[curId].children;
            if (!children || children.length === 0) {
                break;
            }

            curId = nodeMap[curId].children[0].id;
        }

        nodeMap[curId].children.push(curNode);
        constructState(nodeId);
    }

    function findParent(root: StateNode, id: string): string {
        for (let child of root.children) {
            if (child.id === id) {
                return root.id;
            }

            const parent = findParent(child, id);
            if (parent !== '') {
                return parent;
            }
        }

        return '';
    }

    function selectNode(id: string): void {
        setNodeId(id);
        constructState(id);
    }

    function canMerge(nodeId: string): boolean {
        const map = collectNodesIntoMap(root.current);
        if (nodeId in map) {
            const parentId = findParent(root.current, nodeId);
            const parentChildren = map[parentId]?.children;
            return parentChildren && parentChildren.length > 1 && parentChildren.findIndex(n => n.id === nodeId) > 0;
        }

        return false;
    }

    function constructState(nodeId: string) {
        const nodeMap = collectNodesIntoMap(root.current);
        const treePath = collectDescendingTreePath(nodeMap, nodeId);
        const newState: State = {};

        for (let i = 0; i < treePath.length; i++) {
            const curNode = treePath[i];
            if (curNode.command) {
                curNode.command.Execute(newState);
            }
        }

        setState(newState);
    }

    function collectDescendingTreePath(nodeMap: { [key: string]: StateNode }, id: string): StateNode[] {
        const nodes: StateNode[] = [];
        while (id in nodeMap) {
            const curNode = nodeMap[id];
            nodes.unshift(curNode);
            id = findParent(root.current, id);
        }

        return nodes;
    }

    function collectNodesIntoMap(start: StateNode): { [key: string]: StateNode } {
        const result: { [key: string]: StateNode } = {};

        function traverse(node: StateNode) {
            if (node) {
                result[node.id] = node;
                node.children.forEach(traverse);
            }
        }

        traverse(start);
        return result;
    }

    return (
        <StateMachineContext.Provider value={{
            root: root.current,
            state,
            nodeId,
            clear,
            executeCommand,
            merge,
            canMerge,
            selectNode
        }}>
            {props.children}
        </StateMachineContext.Provider>
    );
}

export const useStateMachine = () => useContext(StateMachineContext);