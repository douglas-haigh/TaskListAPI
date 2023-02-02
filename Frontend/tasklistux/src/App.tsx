import React, { useEffect, useState } from 'react';
import './App.css';
import { Task } from './Components/Task';
import {Priority, TaskItem }  from './Types'

function App() {

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[] | undefined>()

  const task1: TaskItem = {
  content: "do washing", 
  priority: Priority.HIGH,
  done: false
  }

  useEffect(() => {
      fetch("/api/tasks", {method: "GET"})
        .then((response) => {
          console.log(response.status)
          console.log(response.text())
          return response.json();
        })
        .then((JSONResponse: TaskItem[]) => {
          console.log(JSONResponse)
          setTasks(JSONResponse)
        })
        .catch((e) => {console.error(e)})
        .finally(() => setLoading(false));
    },[]);

  return (

    <div>
      <Task task={task1}/>
      {tasks && <Task task={tasks[0]} />}
   </div>
  );
}

export default App;
