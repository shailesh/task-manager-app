// src/components/TaskForm.js
import React, { useState } from 'react';
import axios from '../services/api';
import { TASK_STATUSES } from '../utils/constants';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(TASK_STATUSES[0]); // Set default status

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status };
    try {
      const response = await axios.post('/tasks', newTask);
      addTask(response.data);
      setTitle('');
      setDescription('');
      setStatus(TASK_STATUSES[0]); // Reset status after adding task
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
