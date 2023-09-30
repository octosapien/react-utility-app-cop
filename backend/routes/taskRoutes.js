// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import the Task model

// GET all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Retrieve all tasks from the database
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new task
router.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });

  try {
    const newTask = await task.save(); // Save the new task to the database
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) an existing task
router.put('/tasks/:id', async (req, res) => {
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true } // Return the updated task
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id); // Delete the task from the database
    res.sendStatus(204); // 204 No Content response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/tasks/all', async (req, res) => {
  try {
    await Task.deleteMany({}); 
    res.sendStatus(204); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
