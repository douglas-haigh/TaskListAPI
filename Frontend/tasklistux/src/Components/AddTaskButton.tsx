import { ChangeEvent, useState } from "react"
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
                if (response.ok) { 
                    onAdd(task);
                    const location = response.headers.get("Location")!
                    const idString = location.split('/').pop()!
                    const id = parseInt(idString)

                    task.id = id;
                    // return response.json();
                }
            })
            // .then((JSONResponse) => {
            //     console.log(JSONResponse)
            // })
            .catch((e) => {console.error(e)})
            .finally(() => { 
                clearInput();
                console.log("task created with ID = " + task.id)
            })
        }
    }

    return( 
        <div className="Task highlight">
            <h3><u> Add a task: </u></h3>
            <div id="AddTaskButton" test-id='AddTaskButton'> 
                <textarea value={content} id="content-input" name="content" onChange={handleContentChange} onKeyDown={handleKeyDown} rows={3}/>
                <button aria-label="Add Task" id="addButton" onClick={handleAdd} > + </button>
            </div>
            <button aria-label="toggle priority of new task" id="PriorityButton" onClick={handlePriorityClick}> {convertPriority(priority)} </button>
        </div>
    ) 
}