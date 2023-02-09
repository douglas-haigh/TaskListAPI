import { ChangeEvent, useState } from "react"
import { takeCoverage } from "v8";
import { convertPriority } from "../EnumConverters";
import {APIResponse, Priority, Status, TaskItem} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

interface Props { 
    onAdd: ( task: TaskItem ) => void;
}

export const AddTaskButton: React.FC<Props> = ({onAdd}) => { 

    const [content, setContent] = useState("")
    const [priority, setPriority] = useState<Priority>(Priority.MEDIUM)
    const ENDPOINT_URL = `/api/tasks/new`;

    const handleKeyDown = (event: { keyCode: number; preventDefault: () => void; }) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            handleAdd();
        }
    }
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => { 
        setContent(e.target.value);
    }
    const clearInput = () => {
        setContent("")
    }
    const handlePriorityClick = () => { 
        switch(priority) {
            case Priority.LOW:
                setPriority(Priority.MEDIUM)
                break
            case Priority.MEDIUM:
                setPriority(Priority.HIGH)
                break
            case Priority.HIGH:
                setPriority(Priority.LOW)
                break
        }
    }

    const handleAdd = () => {
        
        const task: TaskItem = {
            id: undefined,
            content: content,
            priority: priority,
            status: Status.NOT_STARTED,
        }

        const payload = JSON.stringify({
            content: task.content,
            priority: task.priority.toString(),
            status: task.status.toString()
        })

        if (content.replace(/\s/g, "").length > 2) {

            fetch(ENDPOINT_URL, {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: payload
            })
            .then((response) => {
                onAdd(task);
                return response.json();
            })
            .then((JSONResponse) => {
                task.id = JSONResponse
            })
            .catch((e) => {console.error(e)})
            .finally(() => { 
                clearInput();
                console.log("task created with ID = " + task.id)
            })
        }
    }

    return( 
        <div className="Task">
            <h3><u> Add a task: </u></h3>
            <div id="AddTaskButton"> 
                <textarea value={content} id="content-input" name="content" onChange={handleContentChange} onKeyDown={handleKeyDown} rows={3}/>
                <button onClick={handleAdd} > + </button>
            </div>
            <div id="PriorityButton">
                <button onClick={handlePriorityClick}> {convertPriority(priority)} </button>
            </div>
        </div>
    ) 
}