import React, { useEffect, useState } from 'react';
import './App.css';
import { AddTaskButton } from './Components/AddTaskButton';
import { CompleteTaskButton } from './Components/CompleteTaskButton';
import { Task } from './Components/Task';
import {Priority, TaskItem }  from './Types'

function App() {

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState< TaskItem[]>([])

  const handleTaskAdd = (task: TaskItem) => {
    setTasks((tasks) => {
    const updatedTasks = [...tasks, task];
    return updatedTasks;
  })}

  const handleTaskComplete = (task: TaskItem) => {
    console.log("task completed")
    const updatedTasks = tasks.filter((t) => t.id !== task.id)
    setTasks(updatedTasks);
  }

  useEffect(() => {
      fetch("/api/tasks", {method: "GET"})
        .then((response) => {
          console.log(response.status)
          return response.json();
        })
        .then((JSONResponse: TaskItem[]) => {
          setTasks(JSONResponse)
        })
        .catch((e) => {console.error(e)})
        .finally(() => setLoading(false));
    },[]);


  return (
    <div>
      <div className='TaskList'>
      { tasks?.map((task) => {
          return ( <Task task={task} onComplete={handleTaskComplete} />)
      })}
      <AddTaskButton onAdd={handleTaskAdd}/>
      
      </div>
   </div>
  );
}

export default App;
