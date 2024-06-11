import { Router } from 'express';
import { courseValidation } from './course.validation';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controllers';
import auth from '../../middlewares/auth';
const router = Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);
router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  courseControllers.getAllCourses,
);
router.get('/:id', courseControllers.getSingleCourse);
router.delete('/:id', auth('admin'), courseControllers.deleteCourse);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidation.facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseValidation.facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesWithCourse,
);

export const courseRoutes = router;
