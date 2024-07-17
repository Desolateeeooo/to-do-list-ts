export interface IReward {
    id: string,
    title: string,
    price: string,
}

export interface IRewardList  {
    id: string,
    title: string,
    rewards: IReward[],
}