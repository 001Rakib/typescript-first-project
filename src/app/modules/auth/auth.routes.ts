import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { user_role } from '../user/user.constant';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser,
);
router.post(
  '/change-password',
  auth(user_role.admin, user_role.faculty, user_role.student),
  validateRequest(authValidation.changePasswordValidationSchema),
  authControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const authRoutes = router;
