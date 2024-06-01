import React from "react";
import {AddItemForm} from "../../components/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan";
import {RewardType} from "./RewardsContainer";
import Reward from "../../components/Reward";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, SensorDescriptor, SensorOptions} from "@dnd-kit/core";

type RewardsPropsType = {
    addReward: (title: string, rewardListId?: string, price?: number) => void;
    removeReward: (id: string, rewardListId: string) => void;
    title: string;
    changeRewardsListTitle: (title: string, rewardListId: string | undefined) => void;
    rewards: RewardType[];
    changeRewardTitle: (id: string, title: string, rewardListId: string) => void;
    rewardListId: string;
    sensors: SensorDescriptor<SensorOptions>[];
    onDragEndHandler: (event: DragEndEvent) => void;
};

export const RewardsPresentational = React.memo((props: RewardsPropsType) => {
        return (
            <div>
                <div>
                    <h3>
                        <EditableSpan title={props.title} onChange={props.changeRewardsListTitle}></EditableSpan>
                    </h3>
                    <AddItemForm addItem={props.addReward}></AddItemForm>
                </div>
                <div>
                    <DndContext onDragEnd={props.onDragEndHandler} sensors={props.sensors}>
                        <SortableContext items={props.rewards} strategy={verticalListSortingStrategy}>
                            {props.rewards && props.rewards.map((r) => {
                                return (
                                    <Reward
                                        reward={r}
                                        key={r.id}
                                        id={r.id}
                                        rewardListId={props.rewardListId}
                                        changeRewardTitle={props.changeRewardsListTitle}
                                        removeReward={props.removeReward}
                                    />
                                );
                            })}
                        </SortableContext>
                    </DndContext>

                </div>
            </div>
        );
    }
)
