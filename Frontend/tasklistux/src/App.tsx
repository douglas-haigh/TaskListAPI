import React, { useEffect, useState } from 'react';
import './App.css';
import { AddTaskButton } from './Components/AddTaskButton';
import { SortByPriorityButton } from './Components/SortByPriority';
import { Task } from './Components/Task';
import {TaskItem }  from './Types'

function App() {

  const ENDPOINT_URL = `/api/tasks` 
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState< TaskItem[]>([])
  const [sort, setSort] = useState(false);

  const handleTaskSort = () => { 
    setSort(!sort);
  }

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
      fetch(ENDPOINT_URL, {method: "GET"})
        .then((response) => {
          console.log(response.status)
          return response.json();
        })
        .then((JSONResponse: TaskItem[]) => {
          setTasks(JSONResponse)
        })
        .catch((e) => {console.error(e)})
        .finally(() => setLoading(false));
    },[sort]);

  return (
    <div>
      <h1> Dougie's To-do List </h1>
      <SortByPriorityButton onSort={handleTaskSort} />
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
