import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //creating a schema validation using Zod

    //data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using Zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    // will call service function to send validated data using Zod
    const result = await studentServices.createStudentIntoDB(zodParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
