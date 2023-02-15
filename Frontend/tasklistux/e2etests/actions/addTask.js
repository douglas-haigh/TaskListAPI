import AddTaskButton from '../objects/AddTaskButton'
import {sampleTask} from "../Data"

export const addSampleTask = async (t) => {
    await t
        .typeText(AddTaskButton.taskDescriptionInput, sampleTask.content)
        .click(AddTaskButton.addButton)
}

export const addTaskWithContent = async (t,content) => {
    await t
        .typeText(AddTaskButton.taskDescriptionInput, content)
        .click(AddTaskButton.addButton)
}

