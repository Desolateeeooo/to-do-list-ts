import React from "react";
import TaskSettingsContainer from "../TaskSettings/TaskSettingsContainer"
import "./ModalContent.css";

interface IModalContent {
    onClose: () => void;
		changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
		todoListId: string;
		id: string;
}

interface IModalStyles {
    position: 'fixed';
    top: string;
    left: string;
    transform: string;
    backgroundColor: string;
    padding: string;
    zIndex: number;
    borderRadius: string;
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
    borderRadius: '15px 50px 30px',
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
                <div style={
                    {display: 'flex', flexDirection: 'column'}
                }>
                    <div style={
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '30px',
                        }
                    }>
                        <h4>Edit ToDo</h4>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <button onClick={props.onClose} className="cancel-button">Cancel</button>
                            <button className="save-button">Save</button>
                        </div>
                    </div>
                    <TaskSettingsContainer 
											changeTaskTitle={props.changeTaskTitle}
											todoListId={props.todoListId}
											id={props.id}
										/>
                </div>
            </div>
        </>
    );
}

// TODO delete this component and remove everything to the TaskSettingsPresentational