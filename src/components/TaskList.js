// src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
