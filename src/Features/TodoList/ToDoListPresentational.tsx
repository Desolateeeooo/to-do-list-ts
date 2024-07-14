import {EditableSpan} from "../../Entities/EditableSpan/components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "../../Entities/AddItemForm/components/AddItemForm";
import {DndContext, DragEndEvent, SensorDescriptor} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Task from "./components/Task";
import React, {memo} from "react";
import {TaskType} from "./ToDoList_types";
import {FilterValuesType} from "../../Application/App";

interface ITodoListPresentationalProps {
    id: string;
    title: string;
    filter: FilterValuesType;
    tasks: TaskType[];
    onAllClickHandler: () => void;
    onActiveClickHandler: () => void;
    onCompletedClickHandler: () => void;
    addTaskHandler: (title: string, todolistId?: string) => void;
    changeTaskStatusHandler: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitleHandler: (id: string, newTitle: string, todolistId: string) => void;
    removeTaskHandler: (id: string, todolistId: string) => void;
    removeTodoListHandler: () => void;
    changeTodoListTitleHandler: (newTitle: string) => void;
    sensors: SensorDescriptor<any>[]
    onDragEndHandler: (event: DragEndEvent) => void;
}

const ToDoListPresentational = (props: ITodoListPresentationalProps) => {
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={props.changeTodoListTitleHandler}/>
                <IconButton data-testid={"remove-button"} onClick={props.removeTodoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={props.addTaskHandler} label={"Add a To Do"}/>
            <div>
                <DndContext onDragEnd={props.onDragEndHandler} sensors={props.sensors}>
                    <SortableContext items={props.tasks} strategy={verticalListSortingStrategy}>
                        {props.tasks.map((task) => {
                            return (
                                <Task
                                    changeTaskStatus={props.changeTaskStatusHandler}
                                    changeTaskTitle={props.changeTaskTitleHandler}
                                    removeTask={props.removeTaskHandler}
                                    task={task}
                                    todolistId={props.id}
                                    key={task.id}
                                    id={task.id}
                                />
                            );
                        })}
                    </SortableContext>
                </DndContext>
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={props.onAllClickHandler}>
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={props.onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={props.onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};

export default memo(ToDoListPresentational);