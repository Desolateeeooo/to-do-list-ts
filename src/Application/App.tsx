import React, {useCallback} from 'react';
import './App.css';
import {ToDoListContainer} from '../Features/TodoList/ToDoListContainer';
import {AddItemForm} from '../Entities/AddItemForm/components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../Shared/Store/store';
import {
    addTask,
    addTodoList,
    changeTaskStatus,
    changeTaskTitle,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTask,
    removeTodoList,
} from "../Features/TodoList/toDoListSlice";
import {v1} from "uuid";
import RewardsContainer from "../Features/Rewards/RewardsContainer";
import SearchTermContainer from '../Features/SearchBar/SearchTermContainer';
import {TaskType} from "../Features/TodoList/ToDoList_types";
import {IRewardList} from "../Features/Rewards/Rewards_types";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
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
    const todoLists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todoListSlice);
    const rewards = useSelector<AppRootState, Array<IRewardList>>((state) => state.rewardsSLice);

    const removeTaskHandler = useCallback(
        (id: string, todoListId: string) => {
            dispatch(removeTask({taskId: id, todoListId}));
        },
        [dispatch],
    );

    const addTaskHandler = useCallback(
        (title: string, todoListId?: string) => {
            dispatch(addTask({title, todoListId}));
        },
        [dispatch],
    );

    const changeTaskStatusHandler = useCallback(
        (id: string, isDone: boolean, todoListId: string) => {
            dispatch(changeTaskStatus({taskId: id, isDone, todoListId}));
        },
        [dispatch],
    );

    const changeTaskTitleHandler = useCallback(
        (id: string, newTitle: string, todoListId: string) => {
            dispatch(changeTaskTitle({taskId: id, title: newTitle, todoListId}));
        },
        [dispatch],
    );

    const changeTodoListFilterHandler = useCallback(
        (filter: FilterValuesType, id: string) => {
            dispatch(changeTodoListFilter({filter, id}));
        },
        [dispatch],
    );

    const removeToDoListHandler = useCallback(
        (id: string) => {
            dispatch(removeTodoList({id}));
        },
        [dispatch],
    );

    const changeToDoListTitleHandler = useCallback(
        (id: string, title: string) => {
            dispatch(changeTodoListTitle({id, title}));
        },
        [dispatch],
    );

    const addTodoListHandler = useCallback(
        (title: string) => {
            dispatch(addTodoList({todoListId: v1(), title}));
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
                <Grid container style={{paddingTop: '20px', paddingLeft: '20px'}}>
                    <SearchTermContainer/>
                </Grid>
                <hr/>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoListHandler} label={"Add a To Do List"}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists && todoLists.map((tl) => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoListContainer
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
                                        removeTodoList={removeToDoListHandler}
                                        changeTodoListTitle={changeToDoListTitleHandler}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                    {rewards && rewards.map((rl: IRewardList) => {
                            return (
                                <Grid item key={rl.id}>
                                    <Paper style={{padding: '10px', background: '#eeeeee'}}>
                                        <RewardsContainer
                                            title={rl.title}
                                            rewards={rl.rewards}
                                            rewardListId={rl.id}
                                            key={rl.id}
                                        />
                                    </Paper>
                                </Grid>
                            );
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
