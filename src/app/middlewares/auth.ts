import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if the token is sent from the client
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized user',
      );
    }

    //check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized user',
      );
    }
    // decoded
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
