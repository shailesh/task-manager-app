// src/services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Assuming your server is running locally on port 5000
});

export const getTasks = async () => {
  try {
    const response = await instance.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await instance.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating task');
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await instance.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating task');
  }
};

export const deleteTask = async (taskId) => {
  try {
    await instance.delete(`/tasks/${taskId}`);
  } catch (error) {
    throw new Error('Error deleting task');
  }
};

export default instance;
