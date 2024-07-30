import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).max(20), // Enforces capitalization
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1), // Ensures last name has at least one character
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1).max(20),
  fatherOccupation: z.string().trim().min(1),
  fatherContactNo: z.string().trim().min(1),
  motherName: z.string().trim().min(1),
  motherOccupation: z.string().trim().min(1),
  motherContactNo: z.string().trim().min(1),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().trim().min(1),
  occupation: z.string().trim().min(1),
  contactNo: z.string().trim().min(1),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(), // Validates email format
      contactNumber: z.string().trim().min(1),
      emergencyContactNumber: z.string().trim().min(1),
      bloodGroup: z.enum(['A', 'AB', 'B', 'O']),
      presentAddress: z.string().trim().min(1),
      permanentAddress: z.string().trim().min(1),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      // profileImage: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).max(20).optional(), // Optional but keeps validation rules
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1).optional(), // Optional but keeps validation rules
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1).optional(),
  fatherOccupation: z.string().trim().min(1).optional(),
  fatherContactNo: z.string().trim().min(1).optional(),
  motherName: z.string().trim().min(1).optional(),
  motherOccupation: z.string().trim().min(1).optional(),
  motherContactNo: z.string().trim().min(1).optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().min(1).optional(),
  occupation: z.string().trim().min(1).optional(),
  contactNo: z.string().trim().min(1).optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(), // Optional password update
    student: z.object({
      name: updateUserNameValidationSchema, // Use the updated schema
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(), // Optional email update
      contactNumber: z.string().trim().min(1).optional(),
      emergencyContactNumber: z.string().trim().min(1).optional(),
      bloodGroup: z.enum(['A', 'AB', 'B', 'O']).optional(),
      presentAddress: z.string().trim().min(1).optional(),
      permanentAddress: z.string().trim().min(1).optional(),
      guardian: updateGuardianValidationSchema.optional(), // Optional update for entire guardian
      localGuardian: updateLocalGuardianValidationSchema.optional(), // Optional update for entire local guardian
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
