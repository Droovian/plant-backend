import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
