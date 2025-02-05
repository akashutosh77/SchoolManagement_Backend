import { Response, Request, NextFunction } from "express";
import { db } from "../../db";
import { IResult } from "mssql";

const insertErrorRecord = async (errorObj:any) : Promise <IResult<any>> => {
  // Call the stored procedure with parameters
  const request = db.request()
  const objError = JSON.stringify(errorObj)
  request.input('errorObj', objError);
  request.input('message', errorObj?.message || "");
  request.input('page', errorObj?.page || "");
  const result = await request.execute(`proc_errorLog`);
  return result
};

const errorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle the error
  console.log("Executing error handling middleware :-   ", err.message);
  //insert the error in DB
  const result = await insertErrorRecord(err)
  res.status(500).json({ errorObj: err, result: result });
};

export { errorHandlerMiddleware };
