import {combineReducers, createStore} from 'redux';
import {todoListsReducer} from './features/TodoList/todoListReducer';
import {tasksReducer} from './features/Task/taskReducer';
import {configureStore} from "@reduxjs/toolkit";

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer,
});

export const store= configureStore(
    {
        reducer: rootReducer
    }
);

// @ts-ignore
window.store = store;
