import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

// this will call controller function
router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getSingleStudents);
router.delete('/:studentId', studentController.deleteStudent);
export const StudentRoutes = router;
