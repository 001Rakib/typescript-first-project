import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
);
// router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

// router.get(
//   '/:id',
//   SemesterRegistrationControllers.getSingleSemesterRegistration,
// );

// router.patch(
//   '/:id',
//   validateRequest(
//     semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationControllers.updateSemesterRegistration,
// );

export const offeredCourseRoutes = router;
