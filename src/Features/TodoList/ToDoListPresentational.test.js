import '@testing-library/jest-dom';
import React from 'react';
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
//     // Manually cleanup
//     document.body.removeChild(container);
// });



test('renders learn react link', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    root.render(<Component/>);

    const element = await screen.findByTestId('component-div');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello, World!');

    // Manually cleanup
    document.body.removeChild(container);
});


