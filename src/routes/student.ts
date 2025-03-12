import express from 'express';
import { uploadStudentBulkData } from '../controllers/student';

const router = express.Router();

router.post('/bulk-upload', uploadStudentBulkData);

export default router; 