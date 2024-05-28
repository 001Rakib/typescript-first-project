import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDeparment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    // you can also use this.model instead of AcademicDepartment
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('Department already exists!');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findById(query);
  if (!isDepartmentExists) {
    throw new Error('Department Does Not Exists!');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
