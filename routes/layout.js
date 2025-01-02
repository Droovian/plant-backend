import express from 'express';
import { createLayout } from '../controllers/layoutController.js';
const router = express.Router();

router.post('/add', createLayout);

export default router;