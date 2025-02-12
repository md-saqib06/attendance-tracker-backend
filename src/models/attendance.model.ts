import mongoose, { Schema, Document } from 'mongoose';

interface IAttendance extends Document {
    date: Date;
    classes: string[];
    status: 'Present' | 'Absent';
}

const AttendanceSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    classes: [{
        type: String,
        required: true,
    }],
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true,
    }
}, {
    timestamps: true,
});

export const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
