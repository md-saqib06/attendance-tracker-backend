import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { attendanceRoutes } from './routes/attendance.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/attendance', attendanceRoutes);

// Database connection
const MONGODB_URI = 'mongodb://root:2A830Fixnuh9iZebDLQhNGSyWPdztvkShLhytB8Rfn8xpMwfYFPDn6rJJIru2jRh@82.180.144.165:5432/?directConnection=true';
const db = process.env.MONGODB_URI;
console.log(db)

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));



// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});