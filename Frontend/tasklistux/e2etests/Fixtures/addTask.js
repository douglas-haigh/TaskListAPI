import AddTaskButton from '../objects/AddTaskButton'
import { fixture, Selector } from 'testcafe'
import {sampleTask} from "../Data"
import { ok } from 'assert'


fixture("Add Task Button").page("http://localhost:3000")

test("A new task can be added.", async t => {   
    await t
        .typeText(AddTaskButton.taskDescriptionInput, sampleTask.content)
        .click(AddTaskButton.addButton)
        .expect(Selector('h3').withText(sampleTask.content).exists).ok("Task added")
})

test("A Task cannot be added if description is too short", async t => {
    await t
        .typeText(AddTaskButton.taskDescriptionInput, "s")
        .click(AddTaskButton.addButton)
        .expect((Selector('h3').withExactText("z")).exists).notOk();
})

test("You can change the priority of a task before adding", async t => {
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("High")
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("Low");
    await t.click(AddTaskButton.priorityButton)
    await t.expect(AddTaskButton.priorityButton.textContent).contains("Medium");
    
})