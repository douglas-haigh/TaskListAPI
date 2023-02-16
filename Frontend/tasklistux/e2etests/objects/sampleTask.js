/* eslint-disable import/no-anonymous-default-export */
import { Selector } from "testcafe";
import { sampleTaskData } from "../Data";

const parent = Selector('.Task').withText(sampleTaskData.content);

export default {
    parent: parent,
    taskTitle: parent.find('h3'),
    taskPriority: parent.find('p'),
    taskStatusButton: parent.find('.taskStatusButton'),
    taskCompleteButton: parent.find('.CompleteTaskButton')
}