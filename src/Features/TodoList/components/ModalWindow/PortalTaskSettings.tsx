import React, { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";
import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

interface IPortalTaskSettings {
  changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
	todoListId: string;
	id: string;
}

const PortalTaskSettings = (props: IPortalTaskSettings) => {
  const { changeTaskTitle, todoListId, id } = props;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <IconButton onClick={() => setShowModal(true)}>
        <MoreVert />
      </IconButton>
      {showModal &&
        createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            changeTaskTitle={changeTaskTitle}
						todoListId={todoListId}
						id={id}
          />,
          document.body
        )}
    </>
  );
};

export default PortalTaskSettings;
