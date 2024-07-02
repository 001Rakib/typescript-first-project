import { string, z } from 'zod';
import { user_status } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 character' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...user_status] as [string, ...string[]]),
  }),
});
export const userValidations = {
  userValidationSchema,
  changeStatusValidationSchema,
};
