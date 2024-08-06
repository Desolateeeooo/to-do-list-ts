import React, { memo, useState } from "react";
import "./RewardAmount.css";

const RewardAmount = () => {
  const [rewardAmount, setRewardAmount] = useState("0");

  return (
    <div className="form-group">
      <form>
        <label htmlFor="reward" className="form-label">
          Reward Amount:
        </label>
        <input
          type="range"
          id="reward"
          name="reward"
          min="0"
          max="100"
          step="20"
          className="form-range"
					value={rewardAmount}
					onChange={(e) => {setRewardAmount(e.target.value)}}
        />
        <output id="rewardValue">{rewardAmount}</output>
      </form>
    </div>
  );
};

export default memo(RewardAmount);
