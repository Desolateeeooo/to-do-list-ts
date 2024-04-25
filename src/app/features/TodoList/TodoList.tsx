import React, {useCallback} from 'react';
import {FilterValuesType} from '../../App';
import {AddItemForm} from '../../components/AddItemForm';
import {EditableSpan} from '../../components/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import Task from '../Task/Task';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {DndContext, DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors} from '@dnd-kit/core';
import {useDispatch} from 'react-redux';
import {sortTasksAC} from '../Task/taskReducer';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const TodoList = React.memo((props: PropsType) => {
    const {changeFilter, removeTodolist, changeTodolistTitle, addTask} = props;

    const onAllClickHandler = useCallback(() => changeFilter('all', props.id), [changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', props.id), [changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', props.id), [changeFilter, props.id]);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 500,
            distance: 10,
        },
    });

    const sensors = useSensors(mouseSensor);

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(props.id);
    }, [removeTodolist, props.id]);

    const changeTodolistTitleHandler = useCallback(
        (newTitle: string) => {
            changeTodolistTitle(props.id, newTitle);
        },
        [props.id, changeTodolistTitle],
    );

    const addTaskHandler = useCallback(
        (title: string) => {
            addTask(title, props.id);
        },
        [addTask, props.id],
    );

    let filteredTasks = props.tasks;
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter((t) => t.isDone);
    }
    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter((t) => !t.isDone);
    }

    const dispatch = useDispatch();

    const sortTasksHandler = useCallback(
        (todolistId: string, oldIndex: UniqueIdentifier, newIndex: UniqueIdentifier) => {
            dispatch(sortTasksAC(todolistId, oldIndex, newIndex));
        },
        [dispatch],
    );

    const onDragEndHandler = useCallback(
        (event: DragEndEvent) => {
            const {active, over} = event;
            if (over) {
                const oldIndex = active.id;
                const newIndex = over.id;
                if (active.id !== over.id) {
                    sortTasksHandler(props.id, oldIndex, newIndex);
                }
            }
        },
        [sortTasksHandler, props.id],
    );

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}></EditableSpan>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>
                <DndContext onDragEnd={onDragEndHandler} sensors={sensors}>
                    <SortableContext items={filteredTasks} strategy={verticalListSortingStrategy}>
                        {filteredTasks &&
                            filteredTasks.map((task) => {
                                return (
                                    <Task
                                        changeTaskStatus={props.changeTaskStatus}
                                        changeTaskTitle={props.changeTaskTitle}
                                        removeTask={props.removeTask}
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
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});