import { useEffect, useState } from "react";
import { getApis, postApis } from "../../../api/course.api";
import { Loader } from "../../../utils/Loader";
import {
  allassignmentsdetails,
  assignmentDetailsCourseWise,
} from "../types/assignment.types";
import AssignmentSubmitModal from "./Assignmentsubmitmodal";
import { showToastMessage } from "../../../utils/Toast.errors";

const Assignments = () => {
  const [showmodel, setShowmodel] = useState<boolean>(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<allassignmentsdetails | null>(null);
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
  });

  const openModel = (assignmentsData: allassignmentsdetails) => {
    setShowmodel(true);
    setSelectedAssignment(assignmentsData);
  };

  const closeModel = async () => {
    setShowmodel(false);
    setSelectedAssignment(null);
  };

  const handleSubmit = async (file: File, comment: string) => {
    closeModel();
    setLoading(true);
    const queryParams = {
      courseid: selectedAssignment?.courseid,
      assignmentid: selectedAssignment?.id,
    };
    try {
      const formdata = new FormData();
      formdata.append("submissionpdf", file);
      // formdata.append("comment",comment);
      console.log(comment);

      const response = await postApis(
        "/student/submit/assignment",
        formdata,
        queryParams
      );

      if (response.message) {
        showToastMessage(response.data.message, 200);
        setLoading(false);
        closeModel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const queryParams = {
    page: "1",
    pageSize: "5",
    sortBy: "title",
    sortType: "DESC",
    search: "",
  };

  const handlePaginationChange = (newPage: number) => {
    queryParams.page = newPage.toString();
    fetchAllEnrolledCoursesAssignments();
  };

  const fetchAllEnrolledCoursesAssignments = async () => {
    try {
      setLoading(true);
      const response = await getApis(
        "/student/assignments",
        queryParams
      );
      if (response.data.courses.length > 0) {
        setAssignmentsData(response.data.courses);
        setPagination({
          page: response.data.currentPage,
          totalPages: response.data.totalPages,
        });
      }
      setLoading(false);
    } catch (error) {
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
        {assignmentsData.map((courseData: assignmentDetailsCourseWise) => (
          // courseData.enrolledcourses.assignments.map(
          // (assignment: allassignmentsdetails) => (
          <div
            key={courseData.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
          >
            <h5 className="text-xl font-semibold text-indigo-700 mb-2">
              Name : {courseData.title}
            </h5>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Course name :</span>{" "}
              {courseData.course.coursename}
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {courseData.description}
            </p>

            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Due Date:</span>{" "}
              {new Date(courseData.duedate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {courseData.submissions.length > 0 ? (
              courseData.submissions[0].isaccepted ? (
                <button
                  className="bg-white-600 text-indigo px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                  disabled={true}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="text-white px-4 py-2 rounded cursor-not-allowed"
                  style={{ backgroundColor: "lightblue" }}
                  disabled={true}
                >
                  submitted
                </button>
              )
            ) : new Date(courseData.duedate) < new Date() ? (
              <button
                className="text-white px-4 py-2 bg-red-500 rounded cursor-not-allowed"
                disabled
              >
                Assignment expired
              </button>
            ) : (
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                onClick={() => openModel(courseData)}
              >
                Submit Assignment
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pagination flex content-center justify-center">
        <button
          className="mt-8 w-24 text-white font-semibold py-2 rounded cursor-pointer"
          style={{ backgroundColor: "darkblue-600" }}
          disabled={pagination.page <= 1}
          onClick={() => handlePaginationChange(pagination.page - 1)}
        >
          Prev
        </button>

        <span className="font-semibold mt-12 m-5">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          className="mt-8 w-24 text-white font-semibold py-2 rounded cursor-pointer"
          style={{ backgroundColor: "darkblue-600" }}
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => handlePaginationChange(pagination.page + 1)}
        >
          Next
        </button>
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
