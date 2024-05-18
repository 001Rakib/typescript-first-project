import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).max(20), // Enforces capitalization
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1), // Ensures last name has at least one character
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1).max(20),
  fatherOccupation: z.string().trim().min(1),
  fatherContactNo: z.string().trim().min(1),
  motherName: z.string().trim().min(1),
  motherOccupation: z.string().trim().min(1),
  motherContactNo: z.string().trim().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1),
  occupation: z.string().trim().min(1),
  contactNo: z.string().trim().min(1),
});

export const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  password: z.string().max(20),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(), // Validates email format
  contactNumber: z.string().trim().min(1),
  emergencyContactNumber: z.string().trim().min(1),
  bloodGroup: z.enum(['A', 'AB', 'B', 'O']),
  presentAddress: z.string().trim().min(1),
  permanentAddress: z.string().trim().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
