import { fixture, Selector } from 'testcafe'
import sampleTask from '../objects/sampleTask'
import {Task} from '../objects/Task'
import TaskList from '../objects/TaskList'
import {highPriorityTaskData, lowPriorityTaskData, mediumPriorityTaskData, sampleTaskData} from "../Data"
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
    
    await addSampleTaskWithLowPriority(t)
    await addSampleTaskWithMediumPriority(t)
    await addSampleTaskWithHighPriority(t)  

    const tasksBefore = await TaskList.allTasks
    const taskOneBefore = await tasksBefore.nth(0).textContent
    const taskTwoBefore = await tasksBefore.nth(1).textContent
    const taskThreeBefore = await tasksBefore.nth(2).textContent

    console.log("BEFORE SORTING")
    console.log("Task 1: " + taskOneBefore)
    console.log("Task 2: " + taskTwoBefore)
    console.log("Task 3: " + taskThreeBefore)

    await t.click(TaskList.sortButton)

    const tasks = await TaskList.allTasks
    const taskOne = await tasks.nth(0).textContent
    const taskTwo = await tasks.nth(1).textContent
    const taskThree = await tasks.nth(2).textContent

    console.log("AFTER SORTING")
    console.log("Task 1: " + taskOne)
    console.log("Task 2: " + taskTwo)
    console.log("Task 3: " + taskThree)

    await t
        .expect(taskOne).contains("Priority: High")
        .expect(taskTwo).contains("Priority: Medium")
        .expect(taskThree).contains("Priority: Low")

}).after(async (t) => {
    const lowPTaskClear = new Task(lowPriorityTaskData.content);
    const highPTaskClear = new Task(highPriorityTaskData.content)
    const mediumPTaskClear = new Task(mediumPriorityTaskData.content)

    await completeTask(t, lowPTaskClear);
    await completeTask(t, mediumPTaskClear);
    await completeTask(t, highPTaskClear);
    await clearCompletedTasks(t);
})

test("An existing Task can be completed", async (t) => {
    await addSampleTask(t)
    await t
        .click(sampleTask.completeTaskButton)
        .expect(Selector('.Task').withText(sampleTaskData.content).exists).notOk();
}).after(async (t) => {
    await clearCompletedTasks(t)
})
