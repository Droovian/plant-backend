import { NotificationPreferences } from "../model/NotificationPreferences.js";

// Get notification preferences for a user
export const getNotificationPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log('Fetching notification preferences for user:', userId);
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const preferences = await NotificationPreferences.findOne({ userId });
    // console.log(preferences);
    
    if (!preferences) {
      // Create default preferences
      preferences = await NotificationPreferences.create({
        userId,
        notificationsEnabled: true,
        notificationTime: '08:00',
      });
      console.log('Created default preferences:', preferences);
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
    const { userId } = req.params;
    const { notificationsEnabled, notificationTime } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const preferences = await NotificationPreferences.findOneAndUpdate(
      { userId },
      { notificationsEnabled, notificationTime, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log('Saved preferences:', preferences);

    res.json(preferences);
  } catch (error) {
    console.error('Error saving notification preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
};