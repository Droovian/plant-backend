import express from 'express';
const router = express.Router();
import { registerUser, tryUser } from '../controllers/userController.js';

router.post('/', registerUser);

router.get('/try', tryUser);
export default router;
