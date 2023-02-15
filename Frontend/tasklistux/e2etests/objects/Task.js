import { Selector } from "testcafe";

export class Task {

    task;
    taskId;
    taskHeader; 
    taskPriority;
    taskStatusbutton;
    completeTaskButton;

    constructor(content) {
        this.task = Selector('.Task').withText(content)
        this.taskId = this.task.getAttribute('key')
        this.taskHeader = this.task.find("h3").withText(content)
        this.taskStatusbutton = this.task.find('button').withAttribute('test-id', 'taskStatusButton')
        this.completeTaskButton = this.task.find('button').withText("Done")
    }
}