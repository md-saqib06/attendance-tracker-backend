import { Router } from 'express';
import type { Request, Response, NextFunction } from "express";
import { AttendanceController } from '../controllers/attendance.controller';

const router = Router();

// Define a wrapper to handle async functions
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
router.post('/', asyncHandler(AttendanceController.create));
router.get('/', asyncHandler(AttendanceController.getAll));
router.get('/stats/monthly', asyncHandler(AttendanceController.getMonthlyStats));
router.put('/:id', asyncHandler(AttendanceController.update));
router.delete('/:id', asyncHandler(AttendanceController.delete));

export { router as attendanceRoutes };