import rewardsReducer, {
    addReward, changeRewardPrice,
    changeRewardsListTitle,
    changeRewardTitle,
    removeReward,
    sortRewards
} from "./rewardsSlice";
import {v1} from "uuid";

describe('rewardsSlice', () => {
    it('removes reward with provided id from needed Rewards list', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "Rewards",
                rewards: [
                    {id: "1", title: "Buy a book", price: `${100}`},
                    {id: "2", title: "Buy a coffee", price: `${50}`},
                ],
            },
            {
                id: "2",
                title: "Rewards",
                rewards: [
                    {id: "1", title: "Play games for 1 day", price: `${40}`},
                    {id: "2", title: "Skip sport 1 day", price: `${30}`},
                ],
            },
        ];

        // Act
        const action = removeReward({id: "2", rewardListId: "1"});
        const updatedState = rewardsReducer(initialState, action);

        // Assert
        expect(updatedState[0].rewards.length).toEqual(1);
        expect(updatedState[1].rewards.length).toEqual(2);
    });

    it('adds new reward to a needed Reward list', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "Rewards",
                rewards: [
                    {id: "1", title: "Buy a book", price: `${100}`},
                    {id: "2", title: "Buy a coffee", price: `${50}`},
                ],
            },
            {
                id: "2",
                title: "Rewards",
                rewards: [
                    {id: "1", title: "Play games for 1 day", price: `${40}`},
                    {id: "2", title: "Skip sport 1 day", price: `${30}`},
                ],
            },
        ];

        // Act
        const action = addReward({
            title: "Buy a hamburger",
            rewardListId: "1",
        });
        const updatedState = rewardsReducer(initialState, action);

        // Assert
        expect(updatedState[0].rewards.length).toEqual(3);
        expect(updatedState[1].rewards.length).toEqual(2);
        expect(updatedState[0].rewards[0].title).toStrictEqual("Buy a hamburger");
    });

    it('changes a needed Rewards List Title', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "Rewards",
                rewards: [],
            },
            {
                id: "2",
                title: "Rewards",
                rewards: [],
            },
        ];

        // Act
        const action = changeRewardsListTitle({title: "Bonuses", rewardListId: "1"});
        const updatedState = rewardsReducer(initialState, action);

        // Assert
        expect(updatedState[0].title).toStrictEqual("Bonuses");
        expect(updatedState[1].title).toStrictEqual("Rewards");
    });

    it('changes title of a reward with provided id', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "Rewards",
                rewards: [
                    {id: "1", title: "Buy a book", price: `${100}`},
                    {id: "2", title: "Buy a coffee", price: `${50}`},
                ],
            },
        ];

        // Act
        const action = changeRewardTitle(
            {
                title: "Buy a hamburger",
                id: "1",
                rewardListId: "1"
            }
        );
        const updatedState = rewardsReducer(initialState, action);

        // Assert
        expect(updatedState[0].rewards[0].title).toStrictEqual("Buy a hamburger");
        expect(updatedState[0].rewards[1].title).toStrictEqual("Buy a coffee");
    });

    it('sorts rewards in a needed Rewards List', () => {
        // Arrange

        const rewardId1 = v1();
        const rewardId2 = v1();

        const bonuseId1 = v1();
        const bonuseId2 = v1();

        const initialState = [
            {
                id: "1",
                title: "Rewards",
                rewards: [
                    {id: rewardId1, title: "Buy a book", price: `${100}`},
                    {id: rewardId2, title: "Buy a coffee", price: `${50}`},
                ],
            },
            {
                id: "2",
                title: "Bonuses",
                rewards: [
                    {id: bonuseId1, title: "Buy a hamburger", price: `${100}`},
                    {id: bonuseId2, title: "Buy a coffee", price: `${50}`},
                ],
            },
        ];

        // Act
        const action = sortRewards(
            {
                rewardListId: "1",
                oldIndex: rewardId1,
                newIndex: rewardId2
            }
        );
        const updatedState = rewardsReducer(initialState, action);

        // Assert
        expect(updatedState[0].rewards[0].id).toStrictEqual(rewardId2);
        expect(updatedState[0].rewards[1].id).toStrictEqual(rewardId1);
        expect(updatedState[1].rewards[0].id).toStrictEqual(bonuseId1);
        expect(updatedState[1].rewards[1].id).toStrictEqual(bonuseId2);
    });

    it('changes price of a reward with provided id from a needed Rewards list', () => {
        // Arrange
        const initialState = [
            {
                id: "1",
                title: "Rewards",
                rewards: [
                    {id: "1", title: "Buy a book", price: `${100}`},
                    {id: "2", title: "Buy a coffee", price: `${50}`},
                ],
            },
            {
                id: "2",
                title: "Rewards",
                rewards: [
                    {id: "1", title: "Play games for 1 day", price: `${40}`},
                    {id: "2", title: "Skip sport 1 day", price: `${30}`},
                ],
            },
        ];

        // Act
        const action = changeRewardPrice(
            {
                rewardListId: "1",
                id: "1",
                newPrice: "150",
            }
        );
        const updatedState = rewardsReducer(initialState, action);

        // Assert
        expect(updatedState[0].rewards[0].price).toStrictEqual("150");
        expect(updatedState[0].rewards[1].price).toStrictEqual("50");
        expect(updatedState[1].rewards[0].price).toStrictEqual("40");
        expect(updatedState[1].rewards[1].price).toStrictEqual("30");
    })
});