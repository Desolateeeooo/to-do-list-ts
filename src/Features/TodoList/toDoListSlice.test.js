import React from 'react';
import toDoListReducer, {removeTodoList} from "./toDoListSlice";

describe('toDoListSlice', () => {
    it('removes second ToDoList from initial state', () => {
        // Arrange
        const toDoListId1 = "1";
        const toDoListId2 = "2";

        const initialState = [
            {
                id: toDoListId1,
                title: "What to learn",
                filter: "all",
                tasks: [],
            },
            {
                id: toDoListId2,
                title: "What to buy",
                filter: "all",
                tasks: [],
            },
        ];

        // Act
        const action = removeTodoList({id: toDoListId2});
        const updatedState = toDoListReducer(initialState, action);

        // Assert
        expect(updatedState.length).toEqual(1);
        expect(updatedState[0].id).toEqual(toDoListId1);
    });
});