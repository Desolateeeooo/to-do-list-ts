import {createRoot} from "react-dom/client";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import React from "react";
import {AddItemForm} from "./AddItemForm";
import {act} from "react"
import userEvent from '@testing-library/user-event';
import {debug} from "node:util";

it('should show text content as Buy a coffee', async () => {
    // arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        const root = createRoot(container);
        root.render(<AddItemForm/>);
    });

    const formContainer = await screen.findByTestId('add-item-form');
    expect(formContainer).toBeInTheDocument();

    // Find the input element within the TextField
    const textField = formContainer.querySelector('input');
    expect(textField).toBeInTheDocument();

    const button = await screen.findByTestId('add-item-button');
    expect(button).toBeInTheDocument();

    // Act
    await userEvent.type(textField, 'Buy a coffee');

    // Wait for the input value to be updated
    await waitFor(() => expect(textField).toHaveValue('Buy a coffee'));

    // Manually cleanup
    document.body.removeChild(container);
});