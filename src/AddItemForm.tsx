import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

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
        if (error !== null) {
            setError(null);
        }
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
            <TextField
                label={"Add task"}
                value={taskTitle}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
                error={!!error}
                variant={'outlined'}
                helperText={error}
            />
            <IconButton onClick={handleAddTask} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
}