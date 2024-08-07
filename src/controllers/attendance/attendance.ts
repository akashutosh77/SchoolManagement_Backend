import { Request, Response, NextFunction } from "express";
import { db } from "../../../db";
import sql from "mssql";

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
      .input("attendanceDate", sql.Date, attendanceDate)
      .execute("proc_getAttendanceDetails");

      return res.send(attendanceDetails?.recordsets || []);
   
  } catch (error) {
    next({
      error,
      message: "function getAttendanceDetails Failed!!",
      page: "src\controllers\attendance\attendance.ts",
    });
  }
};

export {getAttendanceDetails}