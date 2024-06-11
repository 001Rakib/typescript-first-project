import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

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

  //create token and send to the client
  const jwtPayload = {
    userId: userData?.id,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expired_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData?.needsPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //check if the user is registered in the database
  const userData = await User.isUserExistsByCustomId(user.userId);
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
  if (
    !(await User.isPasswordMatched(payload?.oldPassword, userData?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password');
  }

  //hash new password

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  //check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;

  //check if the user is registered in the database
  const userData = await User.isUserExistsByCustomId(userId);
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

  if (
    userData.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChange(
      userData.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  const jwtPayload = {
    userId: userData?.id,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );
  return {
    accessToken,
  };
};

export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
};
