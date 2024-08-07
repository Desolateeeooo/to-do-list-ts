import React, {memo, MouseEvent, useCallback} from 'react';
import {IconButton, Paper} from '@mui/material';
import {EditableSpan} from '../../../Entities/EditableSpan/components/EditableSpan';
import {CurrencyYuan, Delete} from '@mui/icons-material';
import {useSortable} from "@dnd-kit/sortable";
import {IReward} from "../Rewards_types";

interface IRewardProps  {
    reward: IReward;
    id: string;
    changeRewardTitle: (id: string, title: string, rewardListId: string) => void;
    rewardListId: string,
    removeReward: (id: string, rewardListId: string) => void;
    price: string;
    changeRewardPrice: (id: string, newPrice: string, rewardListId: string) => void;
}

const Reward = (props: IRewardProps) => {
    const {removeReward, changeRewardTitle, changeRewardPrice, rewardListId, id} = props;

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

    const onChangePriceHandler = useCallback(
        (newValue: string) => {
            changeRewardPrice(id, newValue, rewardListId);
        },
        [id, changeRewardPrice, rewardListId],
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
                    <EditableSpan title={`${props.price}`} onChange={onChangePriceHandler} numberSpan={true}/>
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