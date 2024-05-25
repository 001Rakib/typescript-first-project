import { Router } from 'express';
import { AcademicSemesterControllers } from './academicSemester.controllers';

const router = Router();

router.post(
  '/create-academic-semester',
  AcademicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
