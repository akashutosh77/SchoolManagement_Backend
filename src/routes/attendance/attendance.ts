import express from "express";
import * as attendanceController from "../../controllers/attendance/attendance"
const attendanceRouter = express.Router();
attendanceRouter.get("/getAttendanceDetails", attendanceController.getAttendanceDetails);
attendanceRouter.post("/insertOrUpdateAttendanceDetails", attendanceController.insertOrUpdateAttendanceDetails);

export default attendanceRouter;