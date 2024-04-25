import {
  addTodoListAC,
  changeTodoListFilterAC,
  ChangeTodolistFilterActionType,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer,
} from '../features/TodoList/todoListReducer';
import { FilterValuesType, TodolistType } from '../App';
import { v1 } from 'uuid';

test('correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todoListsReducer(startState, removeTodoListAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = 'New TodoList';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
  expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = 'New TodoList';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const action = changeTodoListTitleAC(todolistId2, newTodolistTitle);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = 'completed';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const action: ChangeTodolistFilterActionType = changeTodoListFilterAC(newFilter, todolistId2);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});