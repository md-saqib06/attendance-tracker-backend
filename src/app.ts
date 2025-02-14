import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { attendanceRoutes } from '../src/routes/attendance.routes';

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/attendance', attendanceRoutes);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI!;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});