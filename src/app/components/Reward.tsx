import React, {ChangeEvent, memo, MouseEvent, useCallback} from 'react';
import {IconButton, Paper} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {CurrencyExchange, CurrencyYuan, Delete} from '@mui/icons-material';
import {RewardType} from "../features/Rewards/RewardsContainer";
import {useSortable} from "@dnd-kit/sortable";

type RewardPropsType = {
    reward: RewardType;
    id: string;
    changeRewardTitle: (id: string, title: string, rewardListId: string) => void;
    rewardListId: string,
    removeReward: (id: string, rewardListId: string) => void;
    price: number;
}

const Reward = (props: RewardPropsType) => {
    const {removeReward, changeRewardTitle, rewardListId, id} = props;

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            transition,
        }
        : undefined;

    const onRemoveHandler = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            event.preventDefault();
            removeReward(id, rewardListId);
        },
        [id, removeReward, rewardListId],
    );

    const onChangeTitleHandler = useCallback(
        (newValue: string) => {
            changeRewardTitle(id, newValue, rewardListId);
        },
        [id, changeRewardTitle, rewardListId],
    );

    return (
        <div
            id={id}
            key={id}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Paper style={{padding: '1px', background: '#FFEEEE'}}>
                    {props.price}
                    <IconButton onClick={(e) => onRemoveHandler(e)}>
                        <CurrencyYuan/>
                    </IconButton>
                </Paper>
                <EditableSpan title={props.reward.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={(e) => onRemoveHandler(e)}>
                    <Delete/>
                </IconButton>
            </div>
        </div>
    );
};

export default memo(Reward);