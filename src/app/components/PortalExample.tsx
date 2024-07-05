import React, {useState} from "react";
import {createPortal} from 'react-dom';
import ModalContent from "./ModalContent";
import {IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";

const PortalExample = () =>  {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <IconButton onClick={() => setShowModal(true)}>
                <MoreVert />
            </IconButton>
            {showModal && createPortal(
                <ModalContent onClose={() => setShowModal(false)}/>,
                document.body
            )}
        </>
    );
}

export default PortalExample;