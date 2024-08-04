import {FilterValuesType} from "../../Application/App";
import {UniqueIdentifier} from "@dnd-kit/core";

export interface IRemoveTodoListAction {
    id: string;
}

export interface IAddTodoListAction {
    title: string;
    todoListId: string;
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
    todoListId: string;
}

export interface IAddTaskAction {
    title: string;
    todoListId?: string;
}

export interface IChangeTaskStatusAction {
    taskId: string;
    todoListId: string;
    isDone: boolean;
}

export interface IChangeTaskTitleAction {
    taskId: string;
    todoListId: string;
    title: string;
}

export interface ISortTasksAction {
    todoListId: string;
    oldIndex: UniqueIdentifier;
    newIndex: UniqueIdentifier;
}