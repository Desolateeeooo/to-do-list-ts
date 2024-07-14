import React, {useCallback} from 'react';
import {FilterValuesType} from '../../Application/App';
import {DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors} from '@dnd-kit/core';
import {useDispatch, useSelector} from 'react-redux';
import {sortTasks} from "./toDoListSlice";
import {AppRootState} from "../../Shared/Store/store";
import {TaskType} from "./ToDoList_types";
import ToDoListPresentational from "./ToDoListPresentational";

interface ToDoListPropsType {
    id: string;
    title: string;
    tasks: TaskType[];
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId?: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const ToDoListContainer = React.memo((props: ToDoListPropsType) => {
    const searchTerm = useSelector<AppRootState, string>((state) => state.searchTermSlice);
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

    const removeTodoListHandler = useCallback(() => {
        removeTodolist(props.id);
    }, [removeTodolist, props.id]);

    const changeTodoListTitleHandler = useCallback(
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
    const searchedTasks = props.tasks.filter((t) => {
        return t.title.toLowerCase().includes(searchTerm.toLowerCase())
    });

    let filteredTasks = searchedTasks;
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter((t) => t.isDone);
    }
    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter((t) => !t.isDone);
    }

    const dispatch = useDispatch();

    const sortTasksHandler = useCallback(
        (todolistId: string, oldIndex: UniqueIdentifier, newIndex: UniqueIdentifier) => {
            dispatch(sortTasks({todolistId, oldIndex, newIndex}));
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
        <ToDoListPresentational
            removeTodoListHandler={removeTodoListHandler}
            changeTodoListTitleHandler={changeTodoListTitleHandler}
            onAllClickHandler={onAllClickHandler}
            onCompletedClickHandler={onCompletedClickHandler}
            onActiveClickHandler={onActiveClickHandler}
            tasks={filteredTasks}
            addTaskHandler={addTaskHandler}
            removeTaskHandler={props.removeTask}
            changeTaskTitleHandler={props.changeTaskTitle}
            changeTaskStatusHandler={props.changeTaskStatus}
            id={props.id}
            title={props.title}
            filter={props.filter}
            sensors={sensors}
            onDragEndHandler={onDragEndHandler}
            data-testid={"ToDoList"}
        />
    );
});