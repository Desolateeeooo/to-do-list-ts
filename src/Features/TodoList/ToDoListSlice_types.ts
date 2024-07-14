import {FilterValuesType} from "../../Application/App";
import {UniqueIdentifier} from "@dnd-kit/core";

export interface IRemoveTodoListAction {
    id: string;
}

export interface IAddTodoListAction {
    title: string;
    todolistId: string;
}

export interface IChangeTodoListTitleAction {
    id: string;
    title: string;
}

export interface IChangeTodoListFilterAction {
    id: string;
    filter: FilterValuesType;
}

export interface IRemoveTaskAction {
    taskId: string;
    todolistId: string;
}

export interface IAddTaskAction {
    title: string;
    todolistId: string;
}

export interface IChangeTaskStatusAction {
    taskId: string;
    todolistId: string;
    isDone: boolean;
}

export interface IChangeTaskTitleAction {
    taskId: string;
    todolistId: string;
    title: string;
}

export interface ISortTasksAction {
    todolistId: string;
    oldIndex: UniqueIdentifier;
    newIndex: UniqueIdentifier;
}