import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty created successfully',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Faculty is retrieved successfully',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty information is updated successfully',
    data: result,
  });
});
export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
