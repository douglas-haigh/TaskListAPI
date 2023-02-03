import React, { useEffect, useState } from 'react';
import './App.css';
import { AddTaskButton } from './Components/AddTaskButton';
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
          return ( <Task task={task} />)
      })}
      <AddTaskButton onAdd={handleTaskAdd}/>
      </div>
   </div>
  );
}

export default App;
