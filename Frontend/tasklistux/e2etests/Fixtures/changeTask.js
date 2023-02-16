import { fixture } from 'testcafe'
import sampleTask from '../objects/sampleTask'
import {Task} from '../objects/Task'
import {TaskList} from '../objects/TaskList'
import {sampleTaskData} from "../Data"
import {addSampleTask, addSampleTaskWithLowPriority, addSampleTaskWithHighPriority, addSampleTaskWithMediumPriority }from '../actions/addTask'
import {completeTask, clearCompletedTasks} from "../actions/cleanUp"

fixture("Change Existing Task").page("http://localhost:3000")

const completeTaskAndClear = async (t, taskToClearup) => {
    await completeTask(t, taskToClearup) 
    await clearCompletedTasks(t)
}

test("An existing task's Status can be changed", async (t) => {
    await addSampleTask(t)

    await t.click(sampleTask.taskStatusButton)
    const sampleTaskStatus = await sampleTask.taskStatusButton.textContent;
    await t.expect(sampleTaskStatus).contains("In Progress");     
}).after(async (t) => {
    const taskToClearup = new Task(sampleTaskData.content);
    await completeTaskAndClear(t, taskToClearup);
  });


test("The tests can be sorted due to priority", async (t) => {
    
    await addSampleTaskWithLowPriority("LOW")
    await addSampleTaskWithMediumPriority("MEDIUM")
    await addSampleTaskWithHighPriority("HIGH")  

    await t.click(TaskList.sortButton)

    const tasks = await TaskList.allTasks

    console.log(tasks[0].textContent)
    console.log(tasks[1].textContent)

})

