import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValuesType, TodolistType } from "../../App";
import { v1 } from "uuid";
import { UniqueIdentifier } from "@dnd-kit/core";
import { TaskType } from "./TodoList";
import {arrayMove} from "@dnd-kit/sortable";

interface IRemoveTodoListAction {
    id: string;
}

interface IAddTodoListAction {
    title: string;
    todolistId: string;
}

interface IChangeTodoListTitleAction {
    id: string;
    title: string;
}

interface IChangeTodoListFilterAction {
    id: string;
    filter: FilterValuesType;
}

interface IRemoveTaskAction {
    taskId: string;
    todolistId: string;
}

interface IAddTaskAction {
    title: string;
    todolistId: string;
}

interface IChangeTaskStatusAction {
    taskId: string;
    todolistId: string;
    isDone: boolean;
}

interface IChangeTaskTitleActionType {
    taskId: string;
    todolistId: string;
    title: string;
}

interface ISortTasksAction {
    todolistId: string;
    oldIndex: UniqueIdentifier;
    newIndex: UniqueIdentifier;
}

export const todolistId1 = v1();
const initialState: Array<TodolistType> = [
    {
        id: todolistId1,
        title: "What to learn",
        filter: "all",
        tasks: [
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
        ],
    },
];

const todoListSlice = createSlice({
    name: "todoLists",
    initialState: initialState,
    reducers: {
        removeTodoList: (state, action: PayloadAction<IRemoveTodoListAction>) => {
            return state.filter((tl) => tl.id !== action.payload.id);
        },
        addTodoList: (state, action: PayloadAction<IAddTodoListAction>) => {
            const { title } = action.payload;
            const newTodoList: TodolistType = {
                id: action.payload.todolistId,
                title,
                filter: "all",
                tasks: [],
            };
            state.unshift(newTodoList);
        },
        changeTodoListTitle: (
            state,
            action: PayloadAction<IChangeTodoListTitleAction>,
        ) => {
            return state.map((tl: TodolistType) =>
                tl.id === action.payload.id
                    ? { ...tl, title: action.payload.title }
                    : tl,
            );
        },
        changeTodoListFilter: (
            state,
            action: PayloadAction<IChangeTodoListFilterAction>,
        ) => {
            return state.map((tl: TodolistType) =>
                tl.id === action.payload.id
                    ? { ...tl, filter: action.payload.filter }
                    : tl,
            );
        },
        removeTask: (state, action: PayloadAction<IRemoveTaskAction>) => {
            const todoListIndex = state.findIndex(
                (tl: TodolistType) => tl.id === action.payload.todolistId,
            );
            state[todoListIndex].tasks = state[todoListIndex].tasks.filter(
                (t: TaskType) => t.id !== action.payload.taskId,
            );
        },
        addTask: (state, action: PayloadAction<IAddTaskAction>) => {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false,
            };
            const todoListIndex = state.findIndex(
                (tl: TodolistType) => tl.id === action.payload.todolistId,
            );
            state[todoListIndex].tasks.unshift(newTask);
        },
        changeTaskStatus: (
            state,
            action: PayloadAction<IChangeTaskStatusAction>,
        ) => {
            const todoListIndex = state.findIndex(
                (tl: TodolistType) => tl.id === action.payload.todolistId,
            );
            state[todoListIndex].tasks = state[todoListIndex].tasks.map(
                (t: TaskType) =>
                    t.id === action.payload.taskId
                        ? {
                            ...t,
                            isDone: action.payload.isDone,
                        }
                        : t,
            );
        },
        changeTaskTitle: (
            state,
            action: PayloadAction<IChangeTaskTitleActionType>,
        ) => {
            const todoListIndex = state.findIndex(
                (tl: TodolistType) => tl.id === action.payload.todolistId,
            );
            state[todoListIndex].tasks = state[todoListIndex].tasks.map(
                (t: TaskType) =>
                    t.id === action.payload.taskId
                        ? {
                            ...t,
                            title: action.payload.title,
                        }
                        : t,
            );
        },
        sortTasks: (state, action: PayloadAction<ISortTasksAction>) => {
            const todoListIndex = state.findIndex(
                (tl: TodolistType) => tl.id === action.payload.todolistId,
            );
            const oldIndex = action.payload.oldIndex;
            const newIndex = action.payload.newIndex;

            const indexFrom = state[todoListIndex].tasks.findIndex((e) => {
                return e.id === oldIndex;
            });
            const indexTo = state[todoListIndex].tasks.findIndex((e) => {
                return e.id === newIndex;
            });

            /**
             * Returns a new array with item moved to the new position
             *
             * @param indexFrom - the index of the item we should move from
             * @param indexTo - the index of the item we should move to
             */
            state[todoListIndex].tasks = arrayMove(
                state[todoListIndex].tasks,
                indexFrom,
                indexTo,
            );
        },
    },
});

export const {
    removeTodoList,
    addTodoList,
    changeTodoListTitle,
    changeTodoListFilter,
    removeTask,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    sortTasks,
} = todoListSlice.actions;

export default todoListSlice.reducer;
