import {UniqueIdentifier} from "@dnd-kit/core";

export interface IAddRewardAction {
    title: string;
    // price: number | undefined;
    rewardListId: string | undefined;
}

export interface IRemoveRewardAction {
    id: string,
    rewardListId: string,
}

export interface IChangeRewardsListTitleAction {
    title: string;
    rewardListId: string | undefined;
}

export interface IChangeRewardTitleAction {
    title: string;
    id: string;
    rewardListId: string;
}

export interface ISortRewardsAction {
    rewardListId: string;
    oldIndex: UniqueIdentifier;
    newIndex: UniqueIdentifier;
}

export interface IChangeRewardPriceAction {
    rewardListId: string;
    id: string;
    newPrice: string;
}