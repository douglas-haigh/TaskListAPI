export const deleteTask = (taskId) => {

    const ENDPOINT_URL = `/api/tasks/delete`

    fetch(ENDPOINT_URL + `?taskId=${taskId}`, {method:"DELETE"})
    .then((response) => {
        console.log(response.status)
        })
    .catch((e) => {console.error("unable to delete task: " + e)} )
}