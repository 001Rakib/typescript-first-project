import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { user_role } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(user_role.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(user_role.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);
router.get('/me', auth('student', 'admin', 'faculty'), UserController.getMe);

export const UserRoutes = router;
