import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';
import {isNumber} from "node:util";

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string, rewardListId?: string) => void;
    numberSpan?: boolean;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    //A regular expression that includes only numbers from 0 to 9
    const regExpForNumbers = new RegExp("^[0-9]*$");

    const handleOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.numberSpan) {
            setTitle(e.currentTarget.value.replace(/[^\d.]/ig, ""));
            if (e.currentTarget.value === "") setTitle(`${0}`);
            if (e.currentTarget.value.charAt(0) === '0' && e.currentTarget.value.length > 1 && (e.currentTarget.value.charAt(1)).match(regExpForNumbers)) {
                setTitle(e.currentTarget.value.charAt(0)
                    .replace('0', e.currentTarget.value.charAt(1)));
            }
        } else {
            setTitle(e.currentTarget.value);
        }
    };

    return editMode ? (
        <TextField
            variant={'standard'}
            value={title}
            onChange={handleOnChangeTitle}
            onBlur={activateViewMode}
            autoFocus={true}
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
});
