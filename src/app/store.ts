import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./features/TodoList/todoListSlice";

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    todoListSlice: todoListSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

//Saving store to the window
// @ts-ignore
window.store = store;
