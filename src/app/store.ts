import { combineReducers, createStore } from 'redux';
import { todoListsReducer } from './features/TodoList/todoListSlice';
import { tasksReducer } from './features/Task/taskSlice';

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todolists: todoListsReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
