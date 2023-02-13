import { TaskItem } from "../Types"

interface Props {
    task: TaskItem
}

export const CompletedTask:React.FC<Props> = ({task}) => { 

    return (
        <div className="CompletedTask"> 
            <h3> {task.content} </h3>
            <p> Completed {task.completionDate} </p>
        </div>
    )
}