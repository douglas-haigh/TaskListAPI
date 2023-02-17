import AddTaskButton from '../objects/AddTaskButton'
import {sampleTaskData, highPriorityTaskData, lowPriorityTaskData, mediumPriorityTaskData} from "../Data"

export const addSampleTask = async (t) => {
    await t
        .typeText(AddTaskButton.taskDescriptionInput, sampleTaskData.content)
        .click(AddTaskButton.addButton)
}

export const addTaskWithContent = async (t,content) => {
    await t
        .typeText(AddTaskButton.taskDescriptionInput, content)
        .click(AddTaskButton.addButton)
}

export const addSampleTaskWithLowPriority = async (t) => {
    await setNewTaskPriority(t, "Low")
    await t
        .typeText(AddTaskButton.taskDescriptionInput, lowPriorityTaskData.content)
        .click(AddTaskButton.addButton)
}
export const addSampleTaskWithMediumPriority = async (t) => {
    await setNewTaskPriority(t, "Medium")
    await t
        .typeText(AddTaskButton.taskDescriptionInput, mediumPriorityTaskData.content)
        .click(AddTaskButton.addButton)
}

export const addSampleTaskWithHighPriority = async (t) => {
    await setNewTaskPriority(t, "High")
    await t
        .typeText(AddTaskButton.taskDescriptionInput, highPriorityTaskData.content)
        .click(AddTaskButton.addButton)
}

export const setNewTaskPriority = async (t, priority) => {

    let correctPriority = false;

    while (correctPriority === false) {
        const currentPriority = await AddTaskButton.priorityButton.textContent
        if (currentPriority.includes(priority)) {
            correctPriority = true
            break}
        else{
            await t.click(AddTaskButton.priorityButton)
            const prio = await AddTaskButton.priorityButton.textContent
            console.log("Current Priority: " + prio)
        }
    }
}
