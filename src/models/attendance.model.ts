import mongoose, { Schema, Document } from 'mongoose';

interface IAttendance extends Document {
    emailAddress: String,
    date: Date,
    classes: string[],
    totalClasses: number,
    attendedClasses: number,
    missedClasses: number,
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
    totalClasses: {
        type: Number,
        required: true,
    },
    attendedClasses: {
        type: Number,
        required: true,
    },
    missedClasses: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true,
    }
}, {
    timestamps: true,
});

export const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
