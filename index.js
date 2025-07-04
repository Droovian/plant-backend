import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import imageRoutes from './routes/images.js';
import communityRoutes from './routes/community.js';
import plantRoutes from './routes/plants.js';
import layoutRoutes from './routes/layout.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import wateringHistoryRoutes from './routes/wateringHistory.js';
import notificationRoutes from './routes/notification.js';
import harvestHistoryRoutes from './routes/harvestHistory.js';
import taskRoutes from './routes/task.js';
import notificationPreferencesRoutes from './routes/notificationPreferences.js';
dotenv.config();
connectDB();
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/layout', layoutRoutes);
app.use('/api/plant', plantRoutes);
app.use('/api/images/upload', imageRoutes);
app.use('/api/watering-history', wateringHistoryRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/harvest-history', harvestHistoryRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notification-preferences', notificationPreferencesRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
