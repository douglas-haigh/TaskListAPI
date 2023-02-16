import AddTaskButton from '../objects/AddTaskButton'
import {sampleTaskData} from "../Data"

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

export const addSampleTaskWithLowPriority = async (t, priority) => {
    await t
        .click(AddTaskButton.priorityButton)
        .click(AddTaskButton.priorityButton)
        .typeText(AddTaskButton.taskDescriptionInput, sampleTaskData.content)
        .click(AddTaskButton.addButton)
}
