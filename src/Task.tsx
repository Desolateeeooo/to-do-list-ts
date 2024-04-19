import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useSortable} from "@dnd-kit/sortable";

type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    todolistId: string
    id: string
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task is called");
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: props.task.id
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
    } : undefined;

    const {removeTask} = props;
    const onRemoveHandler = useCallback(() => {
        removeTask(props.task.id, props.todolistId)
    }, [props.task.id, removeTask, props.todolistId]);

    const {changeTaskStatus} = props;
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.task.id, changeTaskStatus, props.todolistId]);

    const {changeTaskTitle} = props;
    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, changeTaskTitle, props.todolistId]);

    return (
        <div id={props.task.id}
             key={props.task.id}
             className={props.task.isDone ? "is-done" : ""}
             ref={setNodeRef}
             style={style}
             {...attributes}
             {...listeners}
        >
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});