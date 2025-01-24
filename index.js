import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import imageRoutes from './routes/images.js';
import layoutRoutes from './routes/layout.js';
import communityRoutes from './routes/community.js';
import plantRoutes from './routes/plants.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import { requireAuth } from '@clerk/express';

dotenv.config();
connectDB();
const app = express();
app.use(cors());

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);
app.use('/api/community', requireAuth(), communityRoutes);
app.use('/api/plant', requireAuth(), plantRoutes);
app.use('/api/layout', requireAuth(), layoutRoutes);
app.use('/api/images/upload', imageRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
