import { Router } from 'express';
import { courseValidation } from './course.validation';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controllers';
const router = Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);
router.get('/', courseControllers.getAllCourses);
router.get('/:id', courseControllers.getSingleCourse);
router.delete('/:id', courseControllers.deleteCourse);
router.patch(
  '/:id',
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