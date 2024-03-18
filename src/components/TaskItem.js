// src/components/TaskItem.js
import React from 'react';
import axios from '../services/api';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleUpdate = async () => {
    const updatedTask = { ...task, status: task.status === 'To Do' ? 'In Progress' : 'Done' };
    try {
      await axios.put(`/tasks/${task._id}`, updatedTask);
      updateTask(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${task._id}`);
      deleteTask(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <button onClick={handleUpdate}>Update Status</button>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default TaskItem;
