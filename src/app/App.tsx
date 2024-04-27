import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from './features/TodoList/TodoList';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './store';
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
    removeTask,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
} from "./features/TodoList/todoListSlice";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
    tasks: TaskType[];
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistType>>((state) => state.todoListSlice);

    const removeTaskHandler = useCallback(
        (id: string, todolistId: string) => {
            dispatch(removeTask({taskId: id, todolistId}));
        },
        [dispatch],
    );

    const addTaskHandler = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTask({title, todolistId}));
        },
        [dispatch],
    );

    const changeTaskStatusHandler = useCallback(
        (id: string, isDone: boolean, todolistId: string) => {
            dispatch(changeTaskStatus({taskId: id, isDone, todolistId}));
        },
        [dispatch],
    );

    const changeTaskTitleHandler = useCallback(
        (id: string, newTitle: string, todolistId: string) => {
            dispatch(changeTaskTitle({taskId: id, title: newTitle, todolistId}));
        },
        [dispatch],
    );

    const changeTodoListFilterHandler = useCallback(
        (filter: FilterValuesType, id: string) => {
            dispatch(changeTodoListFilter({filter, id}));
        },
        [dispatch],
    );

    const removeTodoListHandler = useCallback(
        (id: string) => {
            dispatch(removeTodoList({id}));
        },
        [dispatch],
    );

    const changeTodoListTitleHandler = useCallback(
        (id: string, title: string) => {
            dispatch(changeTodoListTitle({id, title}));
        },
        [dispatch],
    );

    const addTodoListHandler = useCallback(
        (title: string) => {
            dispatch(addTodoList({todolistId: v1(), title}));
        },
        [dispatch],
    );

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>News</Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoListHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists && todoLists.map((tl) => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tl.tasks}
                                        removeTask={removeTaskHandler}
                                        changeFilter={changeTodoListFilterHandler}
                                        addTask={addTaskHandler}
                                        changeTaskStatus={changeTaskStatusHandler}
                                        changeTaskTitle={changeTaskTitleHandler}
                                        filter={tl.filter}
                                        removeTodolist={removeTodoListHandler}
                                        changeTodolistTitle={changeTodoListTitleHandler}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
