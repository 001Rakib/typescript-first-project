import { Router } from 'express';
import { academicFacultyControllers } from './academicFaculty.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { user_role } from '../user/user.constant';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get(
  '/',
  auth(user_role.admin, user_role.faculty),
  academicFacultyControllers.getAllAcademicFaculty,
);
router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
