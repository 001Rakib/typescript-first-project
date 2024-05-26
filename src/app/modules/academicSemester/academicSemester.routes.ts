import { Router } from 'express';
import { AcademicSemesterControllers } from './academicSemester.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidations.academicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
