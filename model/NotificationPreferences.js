import mongoose from 'mongoose';

const notificationPreferencesSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  notificationsEnabled: { type: Boolean, default: true },
  notificationTime: { type: String, default: '08:00' },
  updatedAt: { type: Date, default: Date.now },
});

export const NotificationPreferences = mongoose.model('NotificationPreferences', notificationPreferencesSchema);