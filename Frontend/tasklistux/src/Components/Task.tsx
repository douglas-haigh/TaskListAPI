import React, {useState } from "react";
import { CompleteTaskButton } from "./CompleteTaskButton";
import { convertPriority, convertStatus } from "../EnumConverters";
import { TaskItem, Status } from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

interface Props{ 
    task: TaskItem;
    onComplete: ( task: TaskItem ) => void;
    // onStatusClick: (task: TaskItem) => void;
}
export const Task: React.FC<Props> = ({task, onComplete}) => {

    const [status, setStatus] = useState(task.status);
    let classList;
    
    const ENDPOINT_URL = `/api/tasks/updateStatus`;

    if (task.status === Status.IN_PROGRESS) {
        classList = "Task highlight"
    }
    else {
        classList = "Task"
    }

    const handleStatusClick = () => {
            switch(status) {
                case Status.NOT_STARTED:
                    task.status = Status.IN_PROGRESS;
                    setStatus(Status.IN_PROGRESS)  
                    updateBackendStatus(Status.IN_PROGRESS)
                    break
                case Status.IN_PROGRESS:
                    task.status = Status.NOT_STARTED
                    setStatus(Status.NOT_STARTED)
                    updateBackendStatus(Status.NOT_STARTED)
                    break
            }
    }

    const updateBackendStatus = (status: Status) => {
        
        fetch(ENDPOINT_URL + `?taskId=${task.id}&newStatus=${task.status}`, {method: "PATCH"})
        .then((response) => {
            console.log(response)
            console.log(response.status)
        })
        .catch((e) => {console.error("Failed to update task status: " + e)})
    }
   
    return (
        <div className={classList} data-testid="Task"> 
            <h3> {task.content} </h3>
            <p data-testid="taskPriority"> Priority: {convertPriority(task.priority)} </p>
            <button className="taskStatusButton" onClick={handleStatusClick}> Status: {convertStatus(task.status)} </button>
            <CompleteTaskButton task={task} onComplete={onComplete} />
        </div>
    )
}


