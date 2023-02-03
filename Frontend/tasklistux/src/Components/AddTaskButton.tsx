import { ChangeEvent, useState } from "react"
import {Priority, Status, TaskItem} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

interface Props { 
    onAdd: ( task: TaskItem ) => void;
}

export const AddTaskButton: React.FC<Props> = ({onAdd}) => { 

    const [content, setContent] = useState(" ")
    // const [priority, setPriority] = useState<Priority>()

    const handleAdd = () => {

        console.log("trying to add task");
        
        const task: TaskItem = {
            content: content,
            priority: Priority.HIGH,
            status: Status.NOT_STARTED,
        }

        const requestParams = new URLSearchParams();
            requestParams.append('content', task.content);
            requestParams.append('priority', task.priority);
            requestParams.append('status', task.status);

        fetch(`/api/tasks/new?${requestParams}` , {method: "POST"})
        .then((response) => {
            console.log(response)
        })
        .then(() => {
            onAdd(task);
        })
        .catch((e) => {console.error(e)})
    }

    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => { 
        setContent(e.target.value);
    }

    // const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => { 
    //     setPriority(e.target.value);
    // }

    return( 
        <div id="AddTaskButton">
            <p> New task: </p>
            <input value={content} id="content-input" name="content" onChange={handleContentChange} /> 
            <button onClick={handleAdd}> + </button>
        </div>
    ) 
}