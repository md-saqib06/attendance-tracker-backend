import mongoose, { Schema, Document } from 'mongoose';

interface IAttendance extends Document {
    emailAddress: String,
    date: Date;
    classes: string[];
    status: 'Present' | 'Absent';
}

const AttendanceSchema = new Schema({
    emailAddress: {
        type: String,
        required: true,
    },
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
