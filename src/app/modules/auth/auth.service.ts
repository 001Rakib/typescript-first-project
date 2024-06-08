import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  //check if the user is registered in the database
  const userData = await User.isUserExistsByCustomId(payload.id);
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //check if the user is already deleted
  if (userData.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }
  //check if the user is blocked
  const userStatus = userData?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  //checking is the password is correct
  if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password');
  }

  //Access Granted: Send access token and refresh token
};

export const authServices = {
  loginUser,
};
