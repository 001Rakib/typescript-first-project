import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

// this will call controller function
router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getSingleStudents);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateStudent,
);
router.delete('/:studentId', studentController.deleteStudent);
export const StudentRoutes = router;
