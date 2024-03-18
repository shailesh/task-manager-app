// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTasks from './components/FilterTasks';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import { TASK_STATUSES } from './utils/constants';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
        setFilteredTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
      filterTasks(filterStatus);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (taskId, updatedTaskData) => {
    try {
      await updateTask(taskId, updatedTaskData);
      const updatedTasks = tasks.map((task) => (task._id === taskId ? updatedTaskData : task));
      setTasks(updatedTasks);
      filterTasks(filterStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      filterTasks(filterStatus);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filterTasks = (status) => {
    if (status === 'All') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
    setFilterStatus(status);
  };

  return (
    <div>
      <h1>Task Management Application</h1>
      <TaskForm addTask={addTask} />
      <FilterTasks handleFilter={filterTasks} />
      <TaskList tasks={filteredTasks} updateTask={updateTaskStatus} deleteTask={removeTask} />
    </div>
  );
};

export default App;
