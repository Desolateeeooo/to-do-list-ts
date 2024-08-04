import React from 'react';
import toDoListReducer, {
    addTask,
    addTodoList, changeTaskStatus, changeTaskTitle,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTask,
    removeTodoList, sortTasks
} from "./toDoListSlice";
import {v1} from "uuid";

describe('toDoListSlice', () => {
    it('removes ToDoList with provided id from initial state', () => {
        // Arrange

        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [],
            },
            {
                id: "2",
                title: "What to buy",
                filter: "all",
                tasks: [],
            },
        ];

        // Act
        const action = removeTodoList({id: "2"});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState.length).toEqual(1);
        expect(updatedState[0].id).toEqual("1");
    });

    it('adds new ToDoList to the beginning of an array', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [],
            },
        ];


        // Act
        const action = addTodoList({
            todoListId: "2",
            title: "What to read"
        });
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState.length).toEqual(2);
        expect(updatedState[0].id).toEqual("2");
    });

    it("changes title of a ToDoList with provided id", () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [],
            },
            {
                id: "2",
                title: "What to buy",
                filter: "all",
                tasks: [],
            },
        ];

        // Act
        const action = changeTodoListTitle({id: "2", title: "What to read"});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState[1].title).toEqual("What to read");
        expect(updatedState[0].title).toEqual("What to learn");
    });

    it('changes filter of a ToDoList with provided id', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [],
            },
            {
                id: "2",
                title: "What to buy",
                filter: "all",
                tasks: [],
            },
        ];

        // Act
        const action = changeTodoListFilter({id: "2", filter: "completed"});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState[1].filter).toEqual("completed");
        expect(updatedState[0].filter).toEqual("all");
    });

    it('removes task with provided id from a needed ToDoList', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [
                    {id: "1", title: "CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                ],
            },
            {
                id: "2",
                title: "What to buy",
                filter: "all",
                tasks: [
                    {id: "1", title: "Coffee", isDone: true},
                    {id: "2", title: "Book", isDone: false},
                ],
            },
        ];

        // Act
        const action = removeTask({taskId: "2", todoListId: "2"});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState[1].tasks.length).toEqual(1);
        expect(updatedState[1].tasks[0].title).toEqual("Coffee");
        expect(updatedState[0].tasks.length).toEqual(2);
    });

    it('adds task with provided id to a needed ToDoList', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [
                    {id: "1", title: "CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                ],
            },
            {
                id: "2",
                title: "What to buy",
                filter: "all",
                tasks: [
                    {id: "1", title: "Coffee", isDone: true},
                    {id: "2", title: "Book", isDone: false},
                ],
            },
        ];

        // Act
        const action = addTask({title: "Water", todoListId: "2"});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState[1].tasks.length).toEqual(3);
        expect(updatedState[1].tasks[0].title).toEqual("Water");
        expect(updatedState[0].tasks.length).toEqual(2);
    });

    it('changes task status with a provided id from a needed ToDoList', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [
                    {id: "1", title: "CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                ],
            },
            {
                id: "2",
                title: "What to buy",
                filter: "all",
                tasks: [
                    {id: "1", title: "Coffee", isDone: true},
                    {id: "2", title: "Book", isDone: false},
                ],
            },
        ];

        // Act
        const action = changeTaskStatus({taskId: "2", todoListId: "2", isDone: true});
        const updatedState = toDoListReducer(initialState, action);

        // Arrange
        expect(updatedState[1].tasks[1].isDone).toEqual(true);
        expect(updatedState[1].tasks[0].isDone).toEqual(true);
        expect(updatedState[0].tasks[1].isDone).toEqual(true);
        expect(updatedState[0].tasks[0].isDone).toEqual(true);
    });

    it('changes task title with provided id from a needed ToDoList', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [
                    {id: "1", title: "CSS", isDone: true},
                    {id: "2", title: "JS", isDone: true},
                ],
            },
            {
                id: "2",
                title: "What to buy",
                filter: "all",
                tasks: [
                    {id: "1", title: "Coffee", isDone: true},
                    {id: "2", title: "Book", isDone: false},
                ],
            },
        ];

        // Act
        const action = changeTaskTitle({taskId: "2", todoListId: "2", title: "Pork Meat"});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState[1].tasks[1].title).toEqual("Pork Meat");
        expect(updatedState[1].tasks[0].title).toEqual("Coffee");
        expect(updatedState[0].tasks[1].title).toEqual("JS");
        expect(updatedState[0].tasks[0].title).toEqual("CSS");
    });

    it('sort tasks in a provided ToDoList', () => {
        // Arrange
        const taskId1 = v1();
        const taskId2 = v1();

        const initialState = [
            {
                id: "1",
                title: "What to learn",
                filter: "all",
                tasks: [
                    {id: taskId1, title: "CSS", isDone: true},
                    {id: taskId2, title: "JS", isDone: true},
                ],
            },
        ];

        // Act
        const action = sortTasks({todoListId: "1", oldIndex: taskId1, newIndex: taskId2});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState[0].tasks[0].title).toEqual("JS");
        expect(updatedState[0].tasks[1].title).toEqual("CSS");
    });
});