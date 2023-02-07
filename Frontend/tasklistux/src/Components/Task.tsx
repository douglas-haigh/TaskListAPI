import { CompleteTaskButton } from "./CompleteTaskButton";
import { TaskItem } from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"


interface Props{ 
    task: TaskItem;
    onComplete: ( task: TaskItem ) => void;
}
export const Task: React.FC<Props> = ({task, onComplete}) => {
   
    return (
        <div className="Task"> 
            <p> {task.content} </p>
            <p> Priority: {task.priority} </p>
            <p> Status: {task.status} </p>
            <CompleteTaskButton task={task} onComplete={onComplete} />
        </div>
    )
}