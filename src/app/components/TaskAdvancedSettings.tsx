import React from "react";



const TaskAdvancedSettings = (props: any) => {
    return (
        <>
            <div>
                <div>
                    <h5>Title*</h5>
                    <input type="text"/>
                </div>
                <div>
                    <h5>Notes</h5>
                    <input type="text"/>
                </div>
            </div>
        </>
    );
}

export default TaskAdvancedSettings;