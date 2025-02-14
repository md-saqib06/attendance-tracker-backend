import type { Request, Response } from 'express';
import { Attendance } from '../models/attendance.model';

class AttendanceController {
    // Create new attendance record
    static async create(req: Request, res: Response) {
        const { emailAddress, date, classes } = req.body;
        const status = classes && classes.length > 0 ? 'Present' : 'Absent';

        const attendance = new Attendance({
            emailAddress,
            date: new Date(date),
            classes,
            status
        });

        const newAttendance = await attendance.save();
        res.status(201).json(newAttendance);
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
            const { emailAddress } = req.params; // Get email from request params

            if (!emailAddress) {
                return res.status(400).json({ message: "Email address is required" });
            }

            const stats = await Attendance.aggregate([{
                $match: { email: emailAddress } // Filter records by email
            }, {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    present: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Present"] }, 1, 0]
                        }
                    },
                    absent: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Absent"] }, 1, 0]
                        }
                    },
                    total: { $sum: 1 }
                }
            }, {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    present: 1,
                    absent: 1,
                    total: 1
                }
            }, { $sort: { year: 1, month: 1 } }
            ]);
            res.json(stats);

        } catch (error) {
            console.error("Error fetching monthly stats:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // Update attendance record
    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { classes } = req.body;
        const status = classes && classes.length > 0 ? 'Present' : 'Absent';

        const attendance = await Attendance.findByIdAndUpdate(
            id,
            { classes, status },
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json(attendance);
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