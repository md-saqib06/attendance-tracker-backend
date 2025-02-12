import { Document } from 'mongoose';

export interface IAttendance extends Document {
    date: Date;
    classes: string[];
    status: 'Present' | 'Absent';
}

export interface IAttendanceCreate {
    date: string | Date;
    classes: string[];
}

export interface IAttendanceUpdate {
    classes: string[];
}

// Add request parameter interface
export interface AttendanceParams {
    id: string;
}