import React from "react";

interface IModalContent {
    onClose: () => void;
}

interface IModalStyles {
    position: 'fixed';
    top: string;
    left: string;
    transform: string;
    backgroundColor: string;
    padding: string;
    zIndex: number;
}

interface IOverlayStyles {
    position: 'fixed';
    top: string;
    left: string;
    right: string;
    bottom: string;
    backgroundColor: string;
    zIndex: number;
}

const MODAL_STYLES: IModalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '50px',
    zIndex: 1000,
}

const OVERLAY_STYLES: IOverlayStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
}

export default function ModalContent(props: IModalContent) {
    return (
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <div>I'm a modal dialog</div>
                <button onClick={props.onClose}>Close</button>
            </div>
        </>
    );
}