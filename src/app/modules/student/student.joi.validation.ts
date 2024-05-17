import Joi from 'joi';

//creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .max(20),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Za-z]+$/),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim().max(20),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNo: Joi.string().required().trim(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required().trim(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema,
  gender: Joi.string().required().valid('male', 'female', 'other'),
  dateOfBirth: Joi.string(),
  email: Joi.string().required().email(),
  contactNumber: Joi.string().required().trim(),
  emergencyContactNumber: Joi.string().required().trim(),
  bloodGroup: Joi.string().required().valid('A', 'AB', 'B', 'O'),
  presentAddress: Joi.string().required().trim(),
  permanentAddress: Joi.string().required().trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked'),
});
export default studentValidationSchema;
