import express from 'express';
import { getTasksByLayout, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Routes
router.get('/layout/:layoutId', getTasksByLayout);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:taskId', deleteTask);

export default router;