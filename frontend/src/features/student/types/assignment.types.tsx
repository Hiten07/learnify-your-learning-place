export interface assignments {
    userid: number,
    courseid: number,
    enrolleddate: string,
    validuntildate: string
    enrolledcourses : assignmentDetailsCourseWise,
}

export interface assignmentDetailsCourseWise {
    courseid: number,
    coursename: string, 
    description: string, 
    instructorid: number, 
    assignments: allassignmentsdetails[]
}

export interface allassignmentsdetails {
    id: number,
    title: string
    description: string,
    assignmentUrl: string,
    duedate: string,
    createdAt: string,
    courseid?: number,
}   
 