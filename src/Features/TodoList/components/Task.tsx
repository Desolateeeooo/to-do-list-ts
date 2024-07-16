import React, {ChangeEvent, memo, MouseEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../Entities/EditableSpan/components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {useSortable} from '@dnd-kit/sortable';
import PortalExample from "../../../Entities/ModalWindow/components/PortalExample";
import {TaskType} from "../ToDoList_types";

interface ITaskProps  {
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    task: TaskType;
    todolistId: string;
    id: string;
};


const Task = (props: ITaskProps) => {
    const {removeTask, changeTaskTitle, changeTaskStatus, task, todolistId, id} = props;

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
            removeTask(id, todolistId);
        },
        [id, removeTask, todolistId],
    );

    const onChangeStatusHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(id, event.currentTarget.checked, todolistId);
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
            <div>
                <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={(e) => onRemoveHandler(e)}>
                    <Delete/>
                </IconButton>
            </div>
            <div>
                <PortalExample/>
            </div>
        </div>
    );
};

export default memo(Task);