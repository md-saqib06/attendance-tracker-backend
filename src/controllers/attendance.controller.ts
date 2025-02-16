import type { Request, Response } from 'express';
import { Attendance } from '../models/attendance.model';

interface AttendanceRecord {
    date: string;
    attendedClasses: number;
    missedClasses: number;
}

interface MonthlyAttendance {
    month: string;
    Present: number;
    Absent: number;
}

function processAttendanceData(data: any[]): MonthlyAttendance[] {
    const attendanceMap = new Map<string, { Present: number; Absent: number }>();

    data.forEach(({ date, attendedClasses, missedClasses }) => {
        const month = new Date(date).toLocaleString('en', { month: 'short' });
        if (!attendanceMap.has(month)) {
            attendanceMap.set(month, { Present: 0, Absent: 0 });
        }
        const record = attendanceMap.get(month)!;
        record.Present += attendedClasses;
        record.Absent += missedClasses;
    });

    return Array.from(attendanceMap, ([month, { Present, Absent }]) => ({ month, Present, Absent }));
}

class AttendanceController {
    // Create new attendance record
    static async create(req: Request, res: Response) {
        const { emailAddress, date, classes, totalClasses } = req.body;
        const status = classes && classes.length > 0 ? 'Present' : 'Absent';
        // const total = classes ? classes.length : 0
        const attendedClasses = classes ? classes.length : 0
        const missedClasses = classes && totalClasses ? totalClasses - attendedClasses : 0

        const attendance = new Attendance({
            emailAddress,
            date: new Date(date),
            classes,
            totalClasses,
            attendedClasses,
            missedClasses,
            status
        });

        const newAttendance = await attendance.save();
        res.status(201).json(newAttendance);
    }

    // Update attendance record
    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { classes, totalClasses } = req.body;
        const status = classes && classes.length > 0 ? 'Present' : 'Absent';
        const attendedClasses = classes ? classes.length : 0
        const missedClasses = classes && totalClasses ? totalClasses - attendedClasses : 0

        const attendance = await Attendance.findByIdAndUpdate(
            id,
            { classes, status, attendedClasses, missedClasses, },
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json(attendance);
    }

    // Get all attendance records
    static async getAll(req: Request, res: Response) {
        try {
            const { emailAddress } = req.params;

            if (!emailAddress) {
                res.status(400).json({ message: "Email is required!" });
            }

            const records = await Attendance.find({ emailAddress: emailAddress }).sort({ date: -1 });
            res.json(records);

        } catch (err) {
            console.error("Error Fetching Attendance: ", err);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    // Get monthly statistics
    static async getMonthlyStats(req: Request, res: Response) {
        try {
            const { emailAddress } = req.params;

            if (!emailAddress) {
                res.status(400).json({ message: "Email is required!" });
            }

            const records = await Attendance.find({ emailAddress: emailAddress }).sort({ date: +1 });
            const extractedData: AttendanceRecord[] = records.map((item: any) => ({
                date: item.date,
                attendedClasses: item.attendedClasses,
                missedClasses: item.missedClasses
            }));

            const attendanceData = processAttendanceData(extractedData);
            res.json(attendanceData);

        } catch (err) {
            console.error("Error Fetching Attendance: ", err);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    // Delete attendance record
    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const attendance = await Attendance.findByIdAndDelete(id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json({ message: 'Attendance record deleted successfully' });
    }
}

export { AttendanceController };