import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

interface IAddItemFormProps {
    addItem: (title: string, rewardListId?: string, price?: number, todolistId?: string) => void;
    label: string;
    style?: React.CSSProperties
};

export const AddItemForm = React.memo((props: IAddItemFormProps) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };
    const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.ctrlKey && e.charCode === 13 && taskTitle.trim() !== '') {
            props.addItem(taskTitle);
            setTaskTitle('');
        }
    };
    const handleAddTask = () => {
        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle.trim());
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    };


    return (
        <div style={{display: 'flex', paddingBottom: '20px'}}>
            <div style={props.style}>
                <TextField
                    label={props.label}
                    value={taskTitle}
                    onChange={handleOnChange}
                    onKeyPress={handleOnKeyPress}
                    error={!!error}
                    variant={'outlined'}
                    helperText={error}
                    data-testid={"add-item-form"}
                />
            </div>
            <IconButton data-testid={"add-item-button"} onClick={handleAddTask} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});
