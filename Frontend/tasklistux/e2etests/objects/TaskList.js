/* eslint-disable import/no-anonymous-default-export */
import { Selector } from 'testcafe';

export default {
    addTaskButton: Selector('.AddTaskButton'),
    clearCompletedTasksButton: Selector('button').withExactText("Clear"),
    sortButton: Selector('#SortButton').find('button'),
    allTasks: Selector('.Task')
    }