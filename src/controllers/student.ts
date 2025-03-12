import { Request, Response } from 'express';
import sql from 'mssql';
import { db } from '../../db';

export const uploadStudentBulkData = async (req: Request, res: Response) => {
    try {
        const students = req.body;

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input: Expected an array of student records'
            });
        }

        // Create table-valued parameter
        const table = new sql.Table('StudentBulkType');
        
        // Define table structure
        table.columns.add('firstName', sql.NVarChar(255));
        table.columns.add('middleName', sql.NVarChar(255));
        table.columns.add('lastName', sql.NVarChar(255));
        table.columns.add('classId', sql.Int);
        table.columns.add('isActive', sql.Bit);
        table.columns.add('admissionDate', sql.DateTime);

        // Add rows to the table
        students.forEach((student: any) => {
            table.rows.add(
                student.firstName || null,
                student.middleName || null,
                student.lastName || null,
                student.classId || null,
                student.isActive !== undefined ? student.isActive : true,
                student.admissionDate || new Date()
            );
        });

        // Execute stored procedure using the existing connection pool
        await db.request()
            .input('studentRecords', table)
            .execute('proc_insertStudentBulkData');

        res.status(200).json({
            success: true,
            message: 'Student records uploaded successfully'
        });

    } catch (error) {
        console.error('Error in uploadStudentBulkData:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while uploading student records',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}; 