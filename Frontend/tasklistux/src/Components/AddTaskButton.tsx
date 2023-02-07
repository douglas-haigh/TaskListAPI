import { ChangeEvent, useState } from "react"
import { takeCoverage } from "v8";
import {Priority, Status, TaskItem} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

interface Props { 
    onAdd: ( task: TaskItem ) => void;
}

export const AddTaskButton: React.FC<Props> = ({onAdd}) => { 

    const [content, setContent] = useState("")
    // const [priority, setPriority] = useState<Priority>()

    const handleKeyDown = (k: { keyCode: number; }) => {
        if (k.keyCode === 13) {
            console.log("hello")
            handleAdd();
        }
    }

    const handleAdd = () => {
        
        const task: TaskItem = {
            id: undefined,
            content: content,
            priority: Priority.HIGH,
            status: Status.NOT_STARTED,
        }

        const payload = JSON.stringify({
            content: task.content,
            priority: task.priority.toString(),
            status: task.status.toString()
        })

        fetch(`/api/tasks/new` , {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: payload
        })
        .then((response) => {
            onAdd(task);
            return response.json();
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
            <input value={content} id="content-input" name="content" onChange={handleContentChange} onKeyDown={handleKeyDown} /> 
            <button onClick={handleAdd} > + </button>
        </div>
    ) 
}