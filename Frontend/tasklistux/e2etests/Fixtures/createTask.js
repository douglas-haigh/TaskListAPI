import AddTaskButton from '../objects/AddTaskButton'
import { fixture, Selector } from 'testcafe'
import {sampleTaskData} from "../Data"
import {Task} from '../objects/Task'
import {addSampleTask, addTaskWithContent} from '../actions/addTask'
import {clearCompletedTasks, completeAllSampleTasks, completeTask} from "../actions/cleanUp"

fixture("Add Task Button").page("http://localhost:3000")

const completeTaskAndClear = async (t, taskToClearup) => {
    await completeTask(t, taskToClearup) 
    await clearCompletedTasks(t)
}

test("A new task can be added.", async t => {   
    await addSampleTask(t)
    await t
        .expect(Selector('h3').withText(sampleTaskData.content).exists).ok("Task added")
}).after(async (t) => {
    const taskToClearup = new Task(sampleTaskData.content);
    await completeTaskAndClear(t, taskToClearup);
  });

test("A Task cannot be added if description is too short", async t => {
    await addTaskWithContent(t, "s");
    await t
        .expect((Selector('h3').withExactText("s")).exists).notOk();
}).after(async (t) => {
    const taskToClearup = new Task("s");
    await completeTaskAndClear(t, taskToClearup);
  });

test("You can change the priority of a task before adding", async t => {
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("High");
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("Low");
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("Medium");
})

