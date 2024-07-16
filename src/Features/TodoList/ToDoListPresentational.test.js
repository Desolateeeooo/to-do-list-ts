import '@testing-library/jest-dom';
import React, {act} from 'react';
import Component from "./Component";
import {createRoot} from "react-dom/client";
import {cleanup, fireEvent, screen} from '@testing-library/react';
import ToDoListPresentational from "./ToDoListPresentational";

// it("removes ToDoList when clicked", async () => {
//     // arrange
//     const container = document.createElement('div');
//     document.body.appendChild(container);
//     const root = createRoot(container);
//     root.render(<ToDoListPresentational/>);
//
//     const removeButton = screen.queryByTestId("remove-button");
//     expect(removeButton).toBeInTheDocument();
//     // // act
//     // fireEvent.click(removeButton);
//     // const ToDoList = await screen.queryByTestId("ToDoListPresentational");
//     //
//     // // assert
//     // expect(ToDoList).toBeNull()
//
//     // Manually cleanup
//     document.body.removeChild(container);
// });

test('renders learn react link', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        const root = createRoot(container);
        root.render(<Component/>);
    });


    const element = await screen.findByTestId('component-div');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello, World!');

    // Manually cleanup
    document.body.removeChild(container);
});


