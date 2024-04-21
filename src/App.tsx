import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>((state) => state.todolists);
    const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks);

    const removeTaskHandler = useCallback(
        (id: string, todolistId: string) => {
            dispatch(removeTaskAC(id, todolistId));
        },
        [dispatch],
    );

    const addTaskHandler = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTaskAC(title, todolistId));
        },
        [dispatch],
    );

    const changeStatusHandler = useCallback(
        (id: string, isDone: boolean, todolistId: string) => {
            dispatch(changeTaskStatusAC(id, isDone, todolistId));
        },
        [dispatch],
    );

    const changeTaskTitleHandler = useCallback(
        (id: string, newTitle: string, todolistId: string) => {
            dispatch(changeTaskTitleAC(id, newTitle, todolistId));
        },
        [dispatch],
    );

    const changeFilterHandler = useCallback(
        (value: FilterValuesType, todolistId: string) => {
            dispatch(changeTodoListFilterAC(value, todolistId));
        },
        [dispatch],
    );

    const removeTodolistHandler = useCallback(
        (todolistId: string) => {
            dispatch(removeTodoListAC(todolistId));
        },
        [dispatch],
    );

    const changeTodolistTitleHandler = useCallback(
        (id: string, title: string) => {
            dispatch(changeTodoListTitleAC(id, title));
        },
        [dispatch],
    );

    const addTodolistHandler = useCallback(
        (title: string) => {
            dispatch(addTodoListAC(title));
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
                    <AddItemForm addItem={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id];

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTaskHandler}
                                        changeFilter={changeFilterHandler}
                                        addTask={addTaskHandler}
                                        changeTaskStatus={changeStatusHandler}
                                        changeTaskTitle={changeTaskTitleHandler}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolistHandler}
                                        changeTodolistTitle={changeTodolistTitleHandler}
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
