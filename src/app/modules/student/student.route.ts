import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// this will call controller function
router.get('/', studentController.getAllStudents);
router.get(
  '/:id',
  auth('admin', 'faculty'),
  studentController.getSingleStudents,
);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateStudent,
);
router.delete('/:id', studentController.deleteStudent);
export const StudentRoutes = router;
