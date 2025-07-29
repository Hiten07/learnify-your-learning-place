import { coursedetails } from "../../courses/types/courses.types";

export interface assignmentDetailsCourseWise {
  id: number;
  title: string;
  description: string;
  assignmentUrl: string;
  duedate: string;
  courseid: number;
  course: coursedetails;
  submissions: submissionsdetails[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface submissionsdetails {
  userid: number;
  courseid: number;
  assignmentid: number;
  isaccepted: boolean;
  submissionUrl: string;
}

export interface allassignmentsdetails {
  id: number;
  title: string;
  description: string;
  assignmentUrl: string;
  duedate: string;
  createdAt: string;
  courseid?: number;
  submissions?: [];
}
