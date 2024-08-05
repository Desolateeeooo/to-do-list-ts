import TaskSettingsPresentational from "./TaskSettingsPresentational";
import {screen} from "@testing-library/react";
import {act} from "react";
import userEvent from '@testing-library/user-event';
import {createRoot} from "react-dom/client";

describe("TaskSettings", () => {
  it("Should show text content as New Task Title!", async () => {
		// Arrange
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      const root = createRoot(container);
      root.render(<TaskSettingsPresentational />);
    });

		// Act
		const textBox = screen.getByTestId("title");
		await userEvent.type(textBox, 'New Task Title!');



		// Assert
		expect(textBox).toBeInTheDocument();
		expect(textBox).toHaveValue('New Task Title!');



    // Manually cleanup
    document.body.removeChild(container);
  });


	it("Should show text content as New Task Notes!", async () => {
		// Arrange
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      const root = createRoot(container);
      root.render(<TaskSettingsPresentational />);
    });

		// Act
		const textBox = screen.getByTestId("notes");
		await userEvent.type(textBox, 'New Task Notes!');



		// Assert
		expect(textBox).toBeInTheDocument();
		expect(textBox).toHaveValue('New Task Notes!');



    // Manually cleanup
    document.body.removeChild(container);
  });
});
