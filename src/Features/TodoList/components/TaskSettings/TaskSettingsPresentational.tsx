import React, { useState, ChangeEvent } from "react";
import "./TaskSettingsPresentational.css"; // Import the CSS file
import RepeatOn from "./components/RepeatOn";
import RewardAmount from "./components/RewardAmount";

interface ITaskSettingsPresentational {
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void; 
	title: string;
}

const TaskSettingsPresentational = (props: ITaskSettingsPresentational) => {
  return (
    <div className="task-settings">
      <div className="form-group">
        <form>
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            data-testid="title"
            className="form-input"
						value={props.title}
						onChange={props.handleInputChange}
          />
        </form>
      </div>
      <div className="form-group">
        <form>
          <label htmlFor="notes" className="form-label">
            Notes:
          </label>
          <textarea
            id="notes"
            name="notes"
            data-testid="notes"
            rows={3}
            className="form-textarea"
          />
        </form>
      </div>
      <div className="form-group">
        <form>
          <label htmlFor="repeats" className="form-label">
            Repeats:
          </label>
          <select id="repeats" name="repeats" className="form-select">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </form>
      </div>
      <RepeatOn />
      <RewardAmount />
    </div>
  );
};

export default TaskSettingsPresentational;
