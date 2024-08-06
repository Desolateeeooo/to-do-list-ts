import TaskSettingsPresentational from "./TaskSettingsPresentational";
import React, { memo, useCallback, useState, ChangeEvent } from "react";

interface ITaskSettingsContainer {
  changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
  todoListId: string;
  id: string;
}

const TaskSettingsContainer = (props: ITaskSettingsContainer) => {
  const { changeTaskTitle, todoListId, id } = props;
	const [title, setTitle] = useState("");

	const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      changeTaskTitle(id, newValue, todoListId);
    },
    [id, changeTaskTitle, todoListId]
  );

	const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle); // Update local state
    onChangeTitleHandler(newTitle); // Dispatch the change
  },
	[onChangeTitleHandler, setTitle]
);

  return <TaskSettingsPresentational handleInputChange={handleInputChange} title={title}/>;
};

export default memo(TaskSettingsContainer);

// TODO add functionality for TaskSettingPresentational
