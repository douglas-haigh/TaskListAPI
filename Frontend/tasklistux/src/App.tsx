import React, { useEffect, useState } from 'react';
import './App.css';
import { AddTaskButton } from './Components/AddTaskButton';
import { CompletedTask } from './Components/CompletedTask';
import { SortByPriorityButton } from './Components/SortByPriority';
import { Task } from './Components/Task';
import {Status, TaskItem }  from './Types'

function App() {

  const ENDPOINT_URL = `/api/tasks` 
  const [loading, setLoading] = useState(false);
  const [incompleteTasks, setIncompleteTasks] = useState< TaskItem[]>([])
  const [completedTasks, setCompletedTasks] = useState<TaskItem[]>([])
  const [sort, setSort] = useState(false);

  const handleTaskSort = () => { 
    setSort(!sort);
  }

  const handleTaskAdd = (task: TaskItem) => {
    setIncompleteTasks((tasks) => {
    const updatedTasks = [...tasks, task];
    return updatedTasks;
  })}

  const handleTaskComplete = (task: TaskItem) => {
    console.log("task completed")
    const updatedIncompleteTasks = incompleteTasks.filter((t) => t.id !== task.id)
    const updatedCompletedTasks = [...completedTasks, task]
    setIncompleteTasks(updatedIncompleteTasks);
    setCompletedTasks(updatedCompletedTasks);
  }

  useEffect(() => {
      fetch(ENDPOINT_URL, {method: "GET"})
        .then((response) => {
          console.log(response.status)
          return response.json();
        })
        .then((JSONResponse: TaskItem[]) => {
          const incompleteTasks = JSONResponse.filter((task) => task.status !== Status.COMPLETED) 
          const completedTasks = JSONResponse.filter((task) => task.status === Status.COMPLETED)
          setIncompleteTasks(incompleteTasks)
          setCompletedTasks(completedTasks)
        })
        .catch((e) => {console.error(e)})
        .finally(() => setLoading(false));
    },[sort]);

  return (
    <div id="App">
      <h1> Dougie's To-do List </h1>
      <SortByPriorityButton onSort={handleTaskSort} />
      <div className='TaskList'>
      { incompleteTasks?.map((task) => {
          return ( <Task task={task} onComplete={handleTaskComplete} />)
      })}
      <AddTaskButton onAdd={handleTaskAdd}/>
      </div>

      <h2> Completed </h2>
      <div className='TaskList'>
        
        { completedTasks?.map((task) => {
          return ( <CompletedTask task={task}/>)
        })}

      </div>   
    </div>
  );
}

export default App;
