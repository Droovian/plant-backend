import { Task } from "../model/Task.js";

// Get all tasks for a layout
export const getTasksByLayout = async (req, res) => {
  try {
    const { layoutId } = req.params;
    const { userId } = req.query; // Use query parameter for userId
    console.log('Fetching tasks for layout:', layoutId, 'user:', userId);

    if (!layoutId || !userId) {
      return res.status(400).json({ message: 'Layout ID and User ID are required' });
    }

    const tasks = await Task.find({ layoutId, userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:',error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { layoutId, userId, description } = req.body;
    
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
    const { id } = req.params;
    const { userId, completed } = req.body; // Require userId in body
    console.log('Updating task:', id, 'for user:', userId);

    if (!id || !userId) {
      return res.status(400).json({ message: 'Task ID and User ID are required' });
    }

    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    task.completed = completed;
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
    const { taskId } = req.params;
    const { userId } = req.body; // Require userId in body
    console.log('Deleting task with ID:', taskId, 'for user:', userId);

    if (!taskId || !userId) {
      return res.status(400).json({ message: 'Task ID and User ID are required' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task deleted' });
  } catch ( error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};