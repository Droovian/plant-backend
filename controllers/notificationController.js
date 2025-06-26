import Notification from '../model/notificationModel.js';

export const createNotification = async (req, res) => {
    try {
        const { imageUrl, token, title, body} = req.body;

        const message = {
            to: token,
            sound: 'default',
            title,
            body,
            image: imageUrl,
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });


        const newNotification = new Notification({
            imageUrl,
            token,
            title,
            body,
            timestamp: new Date(),
        });

        const saved = await newNotification.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create notification', error: error.message });
    }
};

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ timestamp: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
};

export const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findOne({ userId: req.params.id });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notification', error: error.message });
    }
};

