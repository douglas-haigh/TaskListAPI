import TaskList from "../objects/TaskList"

export const clearCompletedTasks = async (t) => {
    await t.click(TaskList.clearCompletedTasksButton)
}

export const completeTask = async (t, task) => {
    await t.click(task.completeTaskButton)
}
