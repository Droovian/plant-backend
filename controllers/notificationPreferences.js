import { NotificationPreferences } from "../model/NotificationPreferences.js";

// Get notification preferences for a user
export const getNotificationPreferences = async (req, res) => {
  try {
    const preferences = await NotificationPreferences.findOne({ userId: req.userId });
    if (!preferences) {
      return res.status(404).json({ message: 'Notification preferences not found' });
    }
    res.json(preferences);
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save or update notification preferences
export const saveNotificationPreferences = async (req, res) => {
  try {
    const { userId, notificationsEnabled, notificationTime } = req.body;
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    // Basic validation for time format (HH:MM)
    if (notificationTime && !/^\d{2}:\d{2}$/.test(notificationTime)) {
      return res.status(400).json({ message: 'Invalid time format. Use HH:MM.' });
    }
    const preferences = await NotificationPreferences.findOneAndUpdate(
      { userId },
      { notificationsEnabled, notificationTime, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json(preferences);
  } catch (error) {
    console.error('Error saving notification preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
};