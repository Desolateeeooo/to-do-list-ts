import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1 } from './todolists-reducer';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export type RemoveTaskActionType = {
  type: 'tasks/removeTask';
  payload: {
    taskId: string;
    todolistId: string;
  };
};

export type AddTaskActionType = {
  type: 'tasks/addTask';
  payload: {
    title: string;
    todolistId: string;
  };
};

export type ChangeTaskStatusActionType = {
  type: 'tasks/changeTaskStatus';
  payload: {
    taskId: string;
    todolistId: string;
    isDone: boolean;
  };
};

export type ChangeTaskTitleActionType = {
  type: 'tasks/changeTaskTitle';
  payload: {
    taskId: string;
    todolistId: string;
    title: string;
  };
};

export type SortTasksActionType = {
  type: 'tasks/sortTasks';
  payload: {
    todolistId: string;
    oldIndex: UniqueIdentifier;
    newIndex: UniqueIdentifier;
  };
};

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SortTasksActionType;

const initialState: TasksStateType = {
  [todolistId1]: [
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ],
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'tasks/removeTask': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = stateCopy[action.payload.todolistId].filter(
        (t) => t.id !== action.payload.taskId,
      );
      return stateCopy;
    }
    case 'tasks/addTask': {
      const stateCopy = { ...state };
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };
      stateCopy[action.payload.todolistId] = [newTask, ...stateCopy[action.payload.todolistId]];
      return stateCopy;
    }
    case 'tasks/changeTaskStatus': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = stateCopy[action.payload.todolistId].map((t) =>
        t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
      );
      return stateCopy;
    }
    case 'tasks/changeTaskTitle': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = stateCopy[action.payload.todolistId].map((t) =>
        t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
      );
      return stateCopy;
    }
    case 'todoLists/addTodoList': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = [];
      return stateCopy;
    }
    case 'todoLists/removeTodoList': {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.id];
      return stateCopy;
    }
    case 'tasks/sortTasks': {
      const oldIndex = action.payload.oldIndex;
      const newIndex = action.payload.newIndex;
      const stateCopy = { ...state };

      const indexFrom = stateCopy[action.payload.todolistId].findIndex((e) => {
        return e.id === oldIndex;
      });
      const indexTo = stateCopy[action.payload.todolistId].findIndex((e) => {
        return e.id === newIndex;
      });

      /**
       * Returns a new array with item moved to the new position
       *
       * @param indexFrom - the index of the item we should move from
       * @param indexTo - the index of the item we should move to
       */
      stateCopy[action.payload.todolistId] = arrayMove(stateCopy[action.payload.todolistId], indexFrom, indexTo);
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: 'tasks/removeTask',
    payload: {
      todolistId: todolistId,
      taskId: taskId,
    },
  };
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {
    type: 'tasks/addTask',
    payload: {
      title: title,
      todolistId: todolistId,
    },
  };
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {
    type: 'tasks/changeTaskStatus',
    payload: {
      isDone: isDone,
      todolistId: todolistId,
      taskId: taskId,
    },
  };
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {
    type: 'tasks/changeTaskTitle',
    payload: {
      title: title,
      todolistId: todolistId,
      taskId: taskId,
    },
  };
};
export const sortTasksAC = (
  todolistId: string,
  oldIndex: UniqueIdentifier,
  newIndex: UniqueIdentifier,
): SortTasksActionType => {
  return {
    type: 'tasks/sortTasks',
    payload: {
      todolistId: todolistId,
      oldIndex: oldIndex,
      newIndex: newIndex,
    },
  };
};
