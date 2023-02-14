/* eslint-disable import/no-anonymous-default-export */
import { Selector } from "testcafe";

export default {
    addTaskHeader: Selector('h3').withText('Add a task'),
    taskDescriptionInput: Selector("textarea"),
    addButton: Selector("#addButton"),
    priorityButton: Selector("#PriorityButton"), 
}