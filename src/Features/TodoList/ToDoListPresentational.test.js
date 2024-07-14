import ToDoListPresentational from './ToDoListPresentational';
import {render} from "react-dom";
import '@testing-library/jest-dom';
import React from 'react';
import {fireEvent} from "@testing-library/react";

it("removes ToDoList when clicked", async () => {
    // arrange
    render(<ToDoListPresentational/>);

    const removeButton = screen.getByTestId("remove-button");

    // act
    fireEvent.click(removeButton);
    const ToDoList = await screen.queryByTestId("ToDoListPresentational");
    // assert
    expect(ToDoList).toBeNull()
});