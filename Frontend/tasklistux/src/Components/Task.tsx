import { CompleteTaskButton } from "./CompleteTaskButton";
import { TaskItem } from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"


interface Props{ 
    task: TaskItem;
    onComplete: ( task: TaskItem ) => void;
}
export const Task: React.FC<Props> = ({task, onComplete}) => {
   
    return (
        <div className="Task"> 
            <h3><u>{task.content} </u></h3>
            <h5> Priority: {task.priority} </h5>
            <h5> Status: {task.status} </h5>
            < CompleteTaskButton task={task} onComplete={onComplete} />
        </div>
    )
}