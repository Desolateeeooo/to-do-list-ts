import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {arrayMove} from "@dnd-kit/sortable";
import {IReward, IRewardList} from "./Rewards_types";
import {
    IAddRewardAction, IChangeRewardPriceAction,
    IChangeRewardsListTitleAction,
    IChangeRewardTitleAction,
    IRemoveRewardAction, ISortRewardsAction
} from "./rewardsSlice_types";

const initialRewardListId = v1();

const initialState: IRewardList[] = [
    {
        id: initialRewardListId,
        title: "Rewards",
        rewards: [
            {id: v1(), title: "Buy a book", price: `${0}`},
        ],
    },
];

const rewardsSlice = createSlice({
    name: "Rewards",
    initialState: initialState,
    reducers: {
        addReward: (state, action: PayloadAction<IAddRewardAction>) => {
            const newReward = {
                id: v1(),
                title: action.payload.title,
                price: `${0}`,
            };
            const rewardListIndex = state.findIndex(
                (rl: IRewardList) => rl.id === action.payload.rewardListId,
            );
            state[rewardListIndex].rewards.unshift(newReward);
        },
        changeRewardsListTitle: (state, action: PayloadAction<IChangeRewardsListTitleAction>) => {
            return state.map((rl: IRewardList) =>
                rl.id === action.payload.rewardListId
                    ? {...rl, title: action.payload.title}
                    : rl,
            );
        },
        changeRewardTitle: (state, action: PayloadAction<IChangeRewardTitleAction>) => {
            const rewardListIndex = state.findIndex(
                (rl: IRewardList) => rl.id === action.payload.rewardListId,
            );
            state[rewardListIndex].rewards = state[rewardListIndex].rewards.map(
                (r: IReward) =>
                    r.id === action.payload.id
                        ? {
                            ...r,
                            title: action.payload.title,
                        }
                        : r,
            );
        },
        removeReward: (state, action: PayloadAction<IRemoveRewardAction>) => {
            const rewardListIndex = state.findIndex(
                (rl: IRewardList) => rl.id === action.payload.rewardListId,
            );
            state[rewardListIndex].rewards = state[rewardListIndex].rewards.filter(
                (r: IReward) => r.id !== action.payload.id,
            );
        },
        sortRewards: (state, action: PayloadAction<ISortRewardsAction>) => {
            const rewardsListIndex = state.findIndex(
                (rl: IRewardList) => rl.id === action.payload.rewardListId,
            );
            const oldIndex = action.payload.oldIndex;
            const newIndex = action.payload.newIndex;

            const indexFrom = state[rewardsListIndex].rewards.findIndex((e) => {
                return e.id === oldIndex;
            });
            const indexTo = state[rewardsListIndex].rewards.findIndex((e) => {
                return e.id === newIndex;
            });

            /**
             * Returns a new array with item moved to the new position
             *
             * @param indexFrom - the index of the item we should move from
             * @param indexTo - the index of the item we should move to
             */
            state[rewardsListIndex].rewards = arrayMove(
                state[rewardsListIndex].rewards,
                indexFrom,
                indexTo,
            );
        },
        changeRewardPrice: (state, action: PayloadAction<IChangeRewardPriceAction>) => {
            const rewardListIndex = state.findIndex(
                (rl: IRewardList) => rl.id === action.payload.rewardListId,
            );
            state[rewardListIndex].rewards = state[rewardListIndex].rewards.map(
                (r: IReward) =>
                    r.id === action.payload.id
                        ? {
                            ...r,
                            price: `${action.payload.newPrice}`,
                        }
                        : r,
            );
        },
    },

});

export const {
    addReward,
    changeRewardsListTitle,
    changeRewardTitle,
    removeReward,
    sortRewards,
    changeRewardPrice,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;