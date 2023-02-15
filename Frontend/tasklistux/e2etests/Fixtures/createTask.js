import AddTaskButton from '../objects/AddTaskButton'
import { fixture, Selector } from 'testcafe'
import {sampleTask} from "../Data"
import {Task} from '../objects/Task'
import {addSampleTask} from '../actions/addTask'
import {clearCompletedTasks, completeTask} from "../actions/cleanUp"

fixture("Add Task Button").page("http://localhost:3000")

const completeTaskAndClear = async (t, taskToClearup) => {
    await completeTask(t, taskToClearup) 
    await clearCompletedTasks(t)
}

test("A new task can be added.", async t => {   
    await addSampleTask(t)
    await t
        .expect(Selector('h3').withText(sampleTask.content).exists).ok("Task added")
}).after(async (t) => {
    const taskToClearup = new Task(sampleTask.content);
    await completeTaskAndClear(t, taskToClearup);
  });

test("A Task cannot be added if description is too short", async t => {
    await t
        .typeText(AddTaskButton.taskDescriptionInput, "s")
        .click(AddTaskButton.addButton)
        .expect((Selector('h3').withExactText("s")).exists).notOk();
})

test("You can change the priority of a task before adding", async t => {
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("High");
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("Low");
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("Medium");
})

