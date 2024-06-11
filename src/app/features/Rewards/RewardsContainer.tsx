import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addReward,
    changeRewardPrice,
    changeRewardsListTitle,
    changeRewardTitle,
    removeReward,
    sortRewards
} from "./rewardsSlice";
import {RewardsPresentational} from "./RewardsPresentational";
import {DragEndEvent, MouseSensor, UniqueIdentifier, useSensor, useSensors} from "@dnd-kit/core";
import {AppRootState} from "../../store";

export type RewardType = {
    id: string,
    title: string,
    price: string,
}

export type RewardListType = {
    id: string,
    title: string,
    rewards: RewardType[],
}

type RewardsAContainerPropsType = {
    title: string,
    rewards: RewardType[],
    rewardListId: string,
}

const RewardsContainer = React.memo((props: RewardsAContainerPropsType) => {
    const searchTerm = useSelector<AppRootState, string>((state) => state.searchTermSlice);
    const dispatch = useDispatch();

    const searchedRewards = props.rewards.filter((r) => {
            return r.title.toLowerCase().includes(searchTerm.toLowerCase())
        });

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 500,
            distance: 10,
        },
    });

    const sensors = useSensors(mouseSensor);

    const addRewardHandler = useCallback((title: string, rewardListId: string | undefined = props.rewardListId) => {
        dispatch(addReward({title, rewardListId}));
    }, [dispatch]);

    const removeRewardHandler = useCallback(
        (id: string, rewardListId: string) => {
            dispatch(removeReward({id, rewardListId}));
        },
        [dispatch],
    );

    const changeRewardsListTitleHandler = useCallback(
        (title: string, rewardListId: string | undefined = props.rewardListId) => {
            dispatch(changeRewardsListTitle({title, rewardListId}));
        },
        [dispatch],
    );

    const changeRewardTitleHandler = useCallback(
        (id: string, newTitle: string, rewardListId: string) => {
            dispatch(changeRewardTitle({id, title: newTitle, rewardListId}));
        },
        [dispatch],
    );

    const changeRewardPriceHandler = useCallback(
        (id: string, newPrice: string, rewardListId: string) => {
            dispatch(changeRewardPrice({id, newPrice, rewardListId}));
        },
        [dispatch],
    );

    const sortRewardsHandler = useCallback(
        (rewardListId: string, oldIndex: UniqueIdentifier, newIndex: UniqueIdentifier) => {
            dispatch(sortRewards({rewardListId, oldIndex, newIndex}));
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
                    sortRewardsHandler(props.rewardListId, oldIndex, newIndex);
                }
            }
        },
        [sortRewardsHandler, props.rewardListId],
    );

    return (
        <RewardsPresentational
            addReward={addRewardHandler}
            removeReward={removeRewardHandler}
            title={props.title}
            changeRewardsListTitle={changeRewardsListTitleHandler}
            rewards={searchedRewards}
            changeRewardTitle={changeRewardTitleHandler}
            rewardListId={props.rewardListId}
            sensors={sensors}
            onDragEndHandler={onDragEndHandler}
            changeRewardPrice={changeRewardPriceHandler}

        />
    );
});

export default RewardsContainer;