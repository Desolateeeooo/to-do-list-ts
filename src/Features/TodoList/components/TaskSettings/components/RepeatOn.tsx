import React, { useState, memo } from "react";
import "./RepeatOn.css";

type Day =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

const RepeatOn = () => {
  // State to track active buttons with type annotation
  const [activeDays, setActiveDays] = useState<Day[]>([]);

  // Toggle active state for a button
  const toggleDay = (day: Day) => {
    setActiveDays((prevActiveDays) =>
      prevActiveDays.includes(day)
        ? prevActiveDays.filter((d) => d !== day)
        : [...prevActiveDays, day]
    );
  };

  // Helper function to determine if a day is active
  const isActive = (day: Day) => activeDays.includes(day);

  return (
    <>
      <label htmlFor="repeatOn">Repeat On</label>
      <form id="repeatOn">
        <br />
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div key={day}>
            <input
              type="button"
              id={day.toLowerCase()}
              name="day"
              value={day}
              className={isActive(day as Day) ? "active" : ""}
              onClick={() => toggleDay(day as Day)}
            />
            <br />
          </div>
        ))}
      </form>
    </>
  );
};

export default memo(RepeatOn);
