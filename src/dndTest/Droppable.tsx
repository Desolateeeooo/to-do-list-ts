import React, {ReactNode} from "react";
import {useDroppable} from '@dnd-kit/core';

interface IDroppable {
    children?: React.ReactNode;
    key: string;
    id: string;
}

export const Droppable = (props: IDroppable) => {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    )
}