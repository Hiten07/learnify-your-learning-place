import { useEffect, useState } from "react";
import { coursesgetApis,coursespostApis } from "../../../api/course.api";
import { Loader } from "../../../utils/Loader";
import { allassignmentsdetails, assignments } from "../types/assignment.types";
import AssignmentSubmitModal from "./Assignmentsubmitmodal";
import { showToastMessage } from "../../../utils/Toast.errors";

const Assignments = () => {

  const [showmodel,setShowmodel] = useState<boolean>(false);
  const [selectedAssignment,setSelectedAssignment]= useState<allassignmentsdetails| null>(null);
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [disabled,setDisabled] = useState([{}]);

  const openModel = (assignment: allassignmentsdetails,courseid: number) => {
        assignment['courseid'] = courseid;
        setShowmodel(true);
        setSelectedAssignment(assignment)
  }

  const closeModel = () => {
    setShowmodel(false);
    setSelectedAssignment(null);
  }

  const handleSubmit = async (file: File,comment: string) => {
    
    setLoading(true);
    const queryParams = {
        courseid: selectedAssignment?.courseid,
        assignmentid: selectedAssignment?.id
      }

    const formdata = new FormData();
    formdata.append("submissionpdf",file);
    // formdata.append("comment",comment);
    console.log(comment);

    const response = await coursespostApis("/student/submit/assignment",formdata,queryParams);

    if(response.message) {
        showToastMessage(response.data.message,200);
        // setDisabled(false)
        setLoading(false);
        closeModel();
    }
  }

  const fetchAllEnrolledCoursesAssignments = async () => {
    try {
      setLoading(true);
      const response = await coursesgetApis("/student/assignments", {});
      if (response.data.length > 0) {
        setAssignmentsData(response.data);
      }
      setLoading(false);
    } 
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEnrolledCoursesAssignments();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-8">
      <h4 className="text-2xl font-bold mb-8">My Assignments</h4>

      {!loading && assignmentsData.length === 0 && (
        <div className="text-center text-lg text-blue-500 mb-4">
          No assignments found
        </div>
      )}

      {loading && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignmentsData.map((courseData: assignments) => (
           
            courseData.enrolledcourses.assignments.map((assignment: allassignmentsdetails) => (
                <div
                key={assignment.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
                >
               
                <h5 className="text-xl font-semibold text-indigo-700 mb-2">
                  Name : {assignment.title}
                </h5>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Course name :</span>{" "}
                  {courseData.enrolledcourses.coursename}
                </p>
                
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {assignment.description}
                </p>

                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Due Date:</span>{" "}
                  {new Date(assignment.duedate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                   })}
                </p>

                <button 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                onClick={() => openModel(assignment,courseData.courseid)} >
                  {assignment ? "submitted" : "Submit assignement"}
                </button>
              
              </div>
            )
          )
        ))}
      </div>

      <AssignmentSubmitModal 
      isOpen={showmodel}
      onClose={closeModel}
      onSubmit={handleSubmit}
      assignment={selectedAssignment}
      />

    </div>
  );
};

export default Assignments;
