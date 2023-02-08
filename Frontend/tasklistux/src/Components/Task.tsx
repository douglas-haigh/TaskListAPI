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
            <h5> Priority: {convertPriority(task.priority)} </h5>
            <h5> Status: {convertStatus(task.status)} </h5>
            < CompleteTaskButton task={task} onComplete={onComplete} />
        </div>
    )
}