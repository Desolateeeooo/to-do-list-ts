import {createRoot} from "react-dom/client";
import {screen, waitFor} from "@testing-library/react";
import React from "react";
import {AddItemForm} from "./AddItemForm";
import {act} from "react"
import userEvent from '@testing-library/user-event';

const addItemMock = jest.fn(); // Mock function

it('should show text content as Buy a coffee', async () => {
    // Arrange
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

    // Act
    await userEvent.type(textField, 'Buy a coffee');

    // Assert
    await waitFor(() => expect(textField).toHaveValue('Buy a coffee'));

    // Manually cleanup
    document.body.removeChild(container);
});

it('should clear the input field after pressing the button', async () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        const root = createRoot(container);
        root.render(<AddItemForm addItem={addItemMock} />); // Pass the mock function as a prop
    });

    const formContainer = await screen.findByTestId('add-item-form');
    expect(formContainer).toBeInTheDocument();

    const textField = formContainer.querySelector('input');
    expect(textField).toBeInTheDocument();

    const button = await screen.findByTestId('add-item-button');
    expect(button).toBeInTheDocument();

    // Act

    await userEvent.type(textField, 'Buy a coffee');
    await waitFor(() => expect(textField).toHaveValue('Buy a coffee'));

    userEvent.click(button);

    // Assert
    await waitFor(() => {
        expect(textField).toHaveValue('');
    });

    // Manually cleanup
    document.body.removeChild(container);
});