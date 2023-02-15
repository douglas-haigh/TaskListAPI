import AddTaskButton from '../objects/AddTaskButton'
import { fixture, Selector } from 'testcafe'
import {sampleTask} from "../Data"
import {Task} from '../objects/Task'

fixture("Change Existing Task").page("http://localhost:3000")

// test("A Task priority can be changed")