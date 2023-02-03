import {TaskItem} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"


interface Props{ 
    task: TaskItem;
}

export const Task = (Props: Props) => {
    return (
        <div className="Task"> 
            <p> {Props.task.content} </p>
            <p> Priority: {Props.task.priority} </p>
        </div>
    )
}