// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = new Task({ title, description, status });
  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
