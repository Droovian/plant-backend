import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
const router = express.Router();
import { authMiddleware } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);

export default router;
