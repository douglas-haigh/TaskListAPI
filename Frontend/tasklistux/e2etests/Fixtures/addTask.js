import AddTaskButton from '../objects/AddTaskButton'
import { fixture, Selector } from 'testcafe'
import {sampleTask} from "../Data"
import { ok } from 'assert'


fixture("Add Task Button").page("http://localhost:3000")

test("A new task can be added.", async t => { 

    
    await t
        .typeText(AddTaskButton.taskDescriptionInput, sampleTask.content)
        .click(AddTaskButton.addButton)
        .expect(Selector('h3').withText(sampleTask.content).exists).ok()

})