import React, {ChangeEvent, memo, MouseEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../Entities/EditableSpan/components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {useSortable} from '@dnd-kit/sortable';
import {TaskType} from "../ToDoList_types";
import PortalTaskSettings from './ModalWindow/PortalTaskSettings';

interface ITaskProps {
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
    removeTask: (id: string, todoListId: string) => void;
    task: TaskType;
    todoListId: string;
    id: string;
};


const Task = (props: ITaskProps) => {
    const {removeTask, changeTaskTitle, changeTaskStatus, task, todoListId, id} = props;

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            transition,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
        }
        : {display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'};

    const onRemoveHandler = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            event.preventDefault();
            removeTask(id, todoListId);
        },
        [id, removeTask, todoListId],
    );

    const onChangeStatusHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(id, event.currentTarget.checked, todoListId);
        },
        [id, changeTaskStatus, todoListId],
    );

    const onChangeTitleHandler = useCallback(
        (newValue: string) => {
            changeTaskTitle(id, newValue, todoListId);
        },
        [id, changeTaskTitle, todoListId],
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
            <div>
                <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={(e) => onRemoveHandler(e)}>
                    <Delete/>
                </IconButton>
            </div>
            <div>
                <PortalTaskSettings
									changeTaskTitle={changeTaskTitle}
									todoListId={todoListId}
									id={id}
								/>
            </div>
        </div>
    );
};

export default memo(Task);