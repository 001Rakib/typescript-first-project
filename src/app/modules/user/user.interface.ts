import { Model } from 'mongoose';
import { user_role } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: 'student' | 'admin' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangedTimeStamp: Date,
    JwtIssuedTimeStamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof user_role;
