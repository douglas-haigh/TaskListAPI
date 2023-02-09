import {TaskItem} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

interface Props { 
    task: TaskItem;
    onComplete: ( task: TaskItem ) => void;
}

export const CompleteTaskButton: React.FC<Props> = ({task, onComplete}) => { 

    const ENDPOINT_URL = `/api/tasks/complete`

    const handleComplete = () => {

        console.log("completing task with id = " + task.id);
            
        fetch(ENDPOINT_URL +`?taskId=${task.id}` , {method: "PATCH"})
        .then((response) => {
            console.log(response)
        })
        .then(() => {
            onComplete(task);
        })
        .catch((e) => {console.error(e)})
    }


    return( 
        <div id="CompleteTaskButton">
            <button onClick={handleComplete}> Done </button>
        </div>
    ) 
}