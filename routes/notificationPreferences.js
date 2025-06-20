import express from 'express';
import {
  getNotificationPreferences,
  saveNotificationPreferences,
} from '../controllers/notificationPreferences.js';

const router = express.Router();

router.get('/', getNotificationPreferences);
router.post('/', saveNotificationPreferences);

export default router;