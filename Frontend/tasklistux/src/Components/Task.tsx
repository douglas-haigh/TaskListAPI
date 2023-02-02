import {TaskItem} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

interface Props{ 
    task: TaskItem;
}

export const Task = (Props: Props) => {
    return (
        <div>
            <p> TODO: {Props.task.content} </p>
            <p> Priority: {Props.task.priority} </p>
        </div>
    )
}