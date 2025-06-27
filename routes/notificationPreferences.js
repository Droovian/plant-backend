import express from 'express';
import {
  getNotificationPreferences,
  saveNotificationPreferences,
} from '../controllers/notificationPreferences.js';

const router = express.Router();

router.get('/:userId', getNotificationPreferences);
router.post('/:userId', saveNotificationPreferences);

export default router;