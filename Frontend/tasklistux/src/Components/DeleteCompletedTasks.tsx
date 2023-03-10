interface Props { 
    onDelete: () => void;
}

export const DeleteCompleteTasks:React.FC<Props> = ({onDelete}) => {

    const ENDPOINT_URL = `/api/tasks/completed`

    const handleDelete = () => {

        fetch(ENDPOINT_URL, {method: 'DELETE'})
        .then((response) => {
            console.log(response.status)
            onDelete()
        })
        .catch((e) => console.error("Delete tasks error: " + e))
    }

    return(
        <button id="DeleteCompletedTasks" onClick={handleDelete} aria-label="Clear completed Tasks"> Clear </button>
    )
}