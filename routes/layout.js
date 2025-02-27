import express from 'express';
import { createLayout, getLayout, getLayoutsByUser, updateLayout, deleteLayout } from '../controllers/layoutController.js';
const router = express.Router();

router.post('/', createLayout);
router.get('/:id', getLayout);
router.get('/', getLayoutsByUser);
router.put('/:id', updateLayout);
router.delete('/:id', deleteLayout);

export default router;