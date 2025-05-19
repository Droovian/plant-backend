import express from 'express';
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', createNotification);           // Create a new notification
router.get('/', getAllNotifications);           // Get all notifications
router.get('/:id', getNotificationById);        // Get a specific notification by ID

export default router;
