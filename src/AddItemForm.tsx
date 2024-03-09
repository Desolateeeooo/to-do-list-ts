import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }
    const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.charCode === 13 && taskTitle.trim() !== "") {
            props.addItem(taskTitle);
            setTaskTitle("");
        }
    }
    const handleAddTask = () => {
        if (taskTitle.trim() !== "") {
            props.addItem(taskTitle.trim());
            setTaskTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <input placeholder={"Add task"}
                   value={taskTitle}
                   onChange={handleOnChange}
                   onKeyPress={handleOnKeyPress}
                   className={error ? "error" : ""}
            />
            <button onClick={handleAddTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
}