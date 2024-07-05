import React from "react";
interface IModalContent {
    onClose: () => void;
}

export default function ModalContent(props: IModalContent) {
    return (
        <div className="modal">
            <div>I'm a modal dialog</div>
            <button onClick={props.onClose}>Close</button>
        </div>
    );
}