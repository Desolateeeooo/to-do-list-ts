import React, {ChangeEvent, memo, MouseEvent, useCallback, useState} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {useSortable} from '@dnd-kit/sortable';
import {TaskType} from "../features/TodoList/TodoList";
import PortalExample from "./PortalExample";

type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    task: TaskType;
    todolistId: string;
    id: string;
};

const Task = (props: TaskPropsType) => {
    const {removeTask, changeTaskTitle, changeTaskStatus, task, todolistId, id} = props;

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            transition,
        }
        : undefined;

    const onRemoveHandler = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            event.preventDefault();
            removeTask(id, todolistId);
        },
        [id, removeTask, todolistId],
    );

    const onChangeStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(id, e.currentTarget.checked, todolistId);
        },
        [id, changeTaskStatus, todolistId],
    );

    const onChangeTitleHandler = useCallback(
        (newValue: string) => {
            changeTaskTitle(id, newValue, todolistId);
        },
        [id, changeTaskTitle, todolistId],
    );

    return (
        <div
            id={id}
            key={id}
            className={task.isDone ? 'is-done' : ''}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={(e) => onRemoveHandler(e)}>
                <Delete/>
            </IconButton>
            <>
                <div>
                    <PortalExample/>
                </div>
            </>
        </div>
    );
};

export default memo(Task);