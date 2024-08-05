import React, {memo}  from "react";


interface ITaskSettingsPresentational {

}

const TaskSettingsPresentational = () => {
  return (
    <>
      <div>
        <div id="change-title">
          <form>
            <label htmlFor="title">Title:</label>
            <br />
            <input type="text" name="title" id="title" data-testid="title"/>
          </form>
        </div>
        <div id="change-notes">
          <form>
            <label htmlFor="notes">Notes:</label>
            <br />
            <textarea id="notes" name="notes" rows={3} cols={30} />
          </form>
        </div>
        <form id="repeats">
          <label htmlFor="repeats">Repeats</label>
          <select id="repeats" name="repeats">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </form>
        <form id="repeatOn">
          <label htmlFor="repeatOn">Repeat On</label>
					<br />
          <input type="button" id="sunday" name="day" value="Sunday" />
          <br />
          <input type="button" id="monday" name="day" value="Monday" />
					<br />
          <input type="button" id="tuesday" name="day" value="Tuesday" />
          <br />
          <input type="button" id="wednesday" name="day" value="Wednesday" />
					<br />
          <input type="button" id="thursday" name="day" value="Thursday" />
          <br />
          <input type="button" id="friday" name="day" value="Friday" />
					<br />
          <input type="button" id="saturday" name="day" value="Saturday" />
        </form>
      </div>
    </>
  );
};

export default memo(TaskSettingsPresentational);

