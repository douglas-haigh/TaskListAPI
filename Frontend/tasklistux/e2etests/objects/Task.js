import { Selector } from "testcafe";

export class Task {

    task;
    taskHeader; 
    taskPriority;
    taskStatusbutton;
    completeTaskButton;

    constructor(content) {
        this.task = Selector('.Task').withText(content)
        this.taskHeader = this.task.find("h3").withText(content)
        this.taskStatusbutton = this.task.find('button').withAttribute('test-id', 'taskStatusButton')
        this.completeTaskButton = this.task.find('button').withText("Done")
    }
}