import { courseContentRepositories } from '../repositories/coursecontent.repositories';
import { getIO, getUserSocketID } from '../utils/socket';

export const notifyStudentsAssignmentAdded = async (courseId: number, assignmentTitle: string) => {
  console.log(courseId,assignmentTitle)
  const students = await courseContentRepositories.getAllStudentsAssignments(courseId);

  students.map((enrollment) => {

    const socketId = getUserSocketID(enrollment.dataValues.userid as string);

    if (socketId) {
      getIO().to(socketId).emit('assignmentAdded', {
        courseId,
        title: assignmentTitle,
        message: `New assignment "${assignmentTitle}" added to your course.`,
      });
    }
    console.log("message sent")
  });
};
