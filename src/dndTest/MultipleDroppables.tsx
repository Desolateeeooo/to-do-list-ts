import {UniqueIdentifier, useDroppable} from "@dnd-kit/core";
import {Draggable} from "./Draggable";
import React from "react";

interface iDroppable {
    key: string;
    id: string;
    children?: React.ReactNode;
}

interface IMultipleDroppable {
    parent: UniqueIdentifier | null;
}

function Droppable(props: iDroppable) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });

    const droppableStyle = {
        border: '1px solid black',
        background: 'gray',
        color: isOver ? 'green' : undefined,
    }

    return (
        <div ref={setNodeRef} style={droppableStyle}>
            {props.children}
        </div>
    );
}

export function MultipleDroppables(props: IMultipleDroppable) {
    const droppables = ['1', '2', '3', '4'];

    const draggableMarkup = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    return (
        <section>
            {droppables.map((id) => (
                <Droppable id={id} key={id}>
                    Droppable container id: {id}
                    <div>
                        {props.parent === id ? draggableMarkup : 'Drop here'}
                        <h1>Droppable</h1>
                    </div>
                </Droppable>
            ))}
        </section>
    );
}