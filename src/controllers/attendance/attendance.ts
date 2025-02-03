import { NextFunction, Request, Response } from "express";
import sql from "mssql";
import { db } from "../../../db";
import { formatDate } from "../../utils";

const getAttendanceDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schoolId = req.query.schoolId;
    const classId = req.query.classId;
    const attendanceDate = req.query.attendanceDate;

    const attendanceDetails = await db
      .request()
      .input("schoolId", sql.Int, schoolId)
      .input("classId", sql.Int, classId)
      .input("attendanceDate", sql.NVarChar(255), attendanceDate)
      .execute("proc_getAttendanceDetails");
    return res.send(attendanceDetails?.recordsets || []);
  } catch (error) {
    next({
      error,
      message: "function getAttendanceDetails Failed!!",
      page: "srccontrollersattendanceattendance.ts",
    });
  }
};

const insertOrUpdateAttendanceDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attendanceRecords = req.body.attendanceRecords;
 
    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty attendance records." });
    }

    // Check if all required fields are present
    for (const record of attendanceRecords) {
      if (!record.studentId || !record.classId || !record.attendanceDate) {
        return res.status(400).json({
          message:
            "Each record must have studentId, classId, and attendanceDate.",
        });
      }
    }

    // Define table-valued parameter schema (must match dbo.AttendanceType)
    const attendanceTable = new sql.Table("AttendanceType");
    attendanceTable.columns.add("studentId", sql.Int);
    attendanceTable.columns.add("classId", sql.Int);
    attendanceTable.columns.add("attendanceDate", sql.Date);
    attendanceTable.columns.add("attendanceStatusId", sql.Int);
    attendanceTable.columns.add("remarks", sql.NVarChar(sql.MAX));

    // Populate table-valued parameter
    attendanceRecords.forEach((record) => {
      attendanceTable.rows.add(
        record.studentId,
        record.classId,
        formatDate(record.attendanceDate),
        record.attendanceStatusId,
        record.remarks
      );
    });
    // Execute stored procedure
    await db
      .request()
      .input("attendanceRecords", sql.TVP, attendanceTable)
      .execute("proc_insertOrUpdateAttendanceDetails");

    return res
      .status(200)
      .json({ message: "Attendance records inserted/updated successfully." });
  } catch (error) {
    next({
      error,
      message: "function insertOrUpdateAttendanceDetails Failed!!",
      page: "src/controllers/attendance/attendance.ts",
    });
  }
};
export { getAttendanceDetails, insertOrUpdateAttendanceDetails };

