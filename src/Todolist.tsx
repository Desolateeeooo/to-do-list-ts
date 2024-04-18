import React, {useCallback} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {
    closestCenter,
    DndContext,
    DragEndEvent, KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDispatch} from "react-redux";
import {sortTasksAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist is called");
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.id, props.changeTodolistTitle]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    let filteredTasks = props.tasks;
    if (props.filter === "completed") {
        filteredTasks.filter(t => t.isDone);
    }
    if (props.filter === "active") {
        filteredTasks.filter(t => !t.isDone);
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const dispatch = useDispatch()

    const sortTasks = useCallback((todolistId: string, oldIndex: UniqueIdentifier, newIndex: UniqueIdentifier)  => {
        dispatch(sortTasksAC(todolistId, oldIndex, newIndex));
    }, [dispatch]);

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (over) {
            if (active.id !== over.id) {
                const oldIndex = active.id
                const newIndex = over.id
                sortTasks(props.id, oldIndex, newIndex);
            }
        }
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}></EditableSpan>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                    <SortableContext items={filteredTasks} strategy={verticalListSortingStrategy}>
                        {
                            filteredTasks && filteredTasks.map(task => {
                                return <Task changeTaskStatus={props.changeTaskStatus}
                                             changeTaskTitle={props.changeTaskTitle}
                                             removeTask={props.removeTask} task={task} todolistId={props.id} key={task.id}
                                             id={task.id}/>
                            })
                        }
                    </SortableContext>
                </DndContext>
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
});

