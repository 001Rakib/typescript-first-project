import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Academic Department name is required' }),
    academicFaculty: z.string(),
  }),
});
const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Academic Department name is required' })
      .optional(),
    academicFaculty: z.string().optional(),
  }),
});
export const academicDepartmentValidations = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};
