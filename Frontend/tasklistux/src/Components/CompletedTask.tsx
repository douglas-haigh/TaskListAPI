import { TaskItem } from "../Types"

interface Props {
    task: TaskItem
}

export const CompletedTask:React.FC<Props> = ({task}) => { 

    return (
        <div className="CompletedTask"> 
            <h3> {task.content} </h3>
            <p> Status: Completed </p>
        </div>
    )
}