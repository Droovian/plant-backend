import { Task } from "../model/Task.js";

// Get all tasks for a layout
export const getTasksByLayout = async (req, res) => {
  try {
    const tasks = await Task.find({ layoutId: req.params.layoutId, userId: req.userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { layoutId, userId, description } = req.body;
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Task description is required' });
    }
    const task = new Task({ layoutId, userId, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task completion status
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    task.completed = req.body.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};