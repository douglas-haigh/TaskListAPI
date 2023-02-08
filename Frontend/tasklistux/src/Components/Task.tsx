import { CompleteTaskButton } from "./CompleteTaskButton";
import { convertPriority, convertStatus } from "./EnumConverters";
import { TaskItem } from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"


interface Props{ 
    task: TaskItem;
    onComplete: ( task: TaskItem ) => void;
}
export const Task: React.FC<Props> = ({task, onComplete}) => {
   
    return (
        <div className="Task"> 
            <h3> {task.content} </h3>
            <p> Priority: {convertPriority(task.priority)} </p>
            <p> Status: {convertStatus(task.status)} </p>
            < CompleteTaskButton task={task} onComplete={onComplete} />
        </div>
    )
}