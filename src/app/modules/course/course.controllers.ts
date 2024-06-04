import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course created successfully',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Course is retrieved successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is retrieved successfully',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseServices.updateCourseIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is updated successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseServices.deleteCourseIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course id deleted successfully',
    data: result,
  });
});
export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
