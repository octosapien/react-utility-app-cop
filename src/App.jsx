import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskList from './TaskList';
import TaskInput from './TaskInput';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:3001/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleAddTask = (newTask) => {
    // Add a new task to the backend API endpoint
    axios.post('http://localhost:3001/tasks', { title: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  const handleDeleteTask = (taskId) => {
    // Delete a task using the backend API endpoint
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="App">
      <h1 id="head1">Todo App</h1>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
