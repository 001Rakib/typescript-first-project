import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  //check if new schedule is conflicting with the assigned schedule
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`05-04-2005T${schedule.startTime}`);
    const existingEndTime = new Date(`05-04-2005T${schedule.endTime}`);

    const newStartTime = new Date(`05-04-2005T${newSchedule.startTime}`);
    const newEndTime = new Date(`05-04-2005T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
