import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'todoLists/removeTodoList';
    payload: {
        id: string;
    };
};

export type AddTodolistActionType = {
    type: 'todoLists/addTodoList';
    payload: {
        title: string;
        todolistId: string;
    };
};

export type ChangeTodolistTitleActionType = {
    type: 'todoLists/changeTodoListTitle';
    payload: {
        id: string;
        title: string;
    };
};
export type ChangeTodolistFilterActionType = {
    type: 'todoLists/changeTodoListFilter';
    payload: {
        id: string;
        filter: FilterValuesType;
    }
};
type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export let todolistId1 = v1();

const initialState: Array<TodolistType> = [{id: todolistId1, title: 'What to learn', filter: 'all'}];

export const todolistsReducer = (
    state: Array<TodolistType> = initialState,
    action: ActionType,
): Array<TodolistType> => {
    switch (action.type) {
        case 'todoLists/removeTodoList': {
            return state.filter((tl) => tl.id !== action.payload.id);
        }
        case 'todoLists/addTodoList': {
            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state];
        }
        case 'todoLists/changeTodoListTitle': {
            const todolist = state.find((tl) => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;
            }
            return [...state];
        }
        case 'todoLists/changeTodoListFilter': {
            const todolist = state.find((tl) => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
            return [...state];
        }
        default:
            return state;
    }
};

export const removeTodoListAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'todoLists/removeTodoList',
        payload: {
            id: todolistId,
        },
    };
};

export const addTodoListAC = (title: string): AddTodolistActionType => {
    return {
        type: 'todoLists/addTodoList',
        payload: {
            title: title,
            todolistId: v1(),
        },
    };
};

export const changeTodoListTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'todoLists/changeTodoListTitle',
        payload: {
            id: todolistId,
            title: title,
        },
    };
};

export const changeTodoListFilterAC = (
    filter: FilterValuesType,
    todolistId: string,
): ChangeTodolistFilterActionType => {
    return {
        type: 'todoLists/changeTodoListFilter',
        payload: {
            id: todolistId,
            filter: filter,
        },
    };
};
