import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

// this will call controller function
router.post('/create-student', studentController.createStudent);
