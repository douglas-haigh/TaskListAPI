import {Status, TaskItem} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

interface Props { 
    task: TaskItem;
    onComplete: ( task: TaskItem ) => void;
}

export const CompleteTaskButton: React.FC<Props> = ({task, onComplete}) => { 

    const ENDPOINT_URL = `/api/tasks/status`

    const handleComplete = () => {

        console.log("completing task with id = " + task.id);
            
        fetch(ENDPOINT_URL +`?taskId=${task.id}&newStatus=${Status.COMPLETED}` , {method: "PATCH"})
        .then((response) => {
            return response.json()
        })
        .then((JSONResponse) => {
            task.completionDate = JSONResponse.substring(0,10);
            onComplete(task);
        })
        .catch((e) => {console.error(e)})
    }


    return( 
        <div className="CompleteTaskButton">
            <button onClick={handleComplete} aria-label="Complete Task"> Done </button>
        </div>
    ) 
}