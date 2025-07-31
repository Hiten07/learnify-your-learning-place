import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { coursesgetApis, coursespostApis } from "../../../api/course.api";
import { Coursemodule, CourseModulelessons } from "../types/courses.types";
import { AddAssignmentModal } from "./AddAssignmentModal";
import { Loader } from "../../../utils/Loader";
import { AssignmentForm } from "../models/Assignment.zod";
import { showToastMessage } from "../../../utils/Toast.errors";
import { useAuthContext } from "../../../hooks/Createcontext";
import { useNavigate } from "react-router-dom";

const Coursematerial = () => {
  const [courseData, setCourseData] = useState([]);
  const [showaddAssignmentModal, setshowaddAssignmentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { courseid } = useParams();
  const coursedetails = useLocation();
  const navigate = useNavigate();

  const { role } = useContext(useAuthContext);

  const queryParams = {
    courseid: courseid,
  };

  const handleAssignmentSubmit = async (data: AssignmentForm) => {
    try {
      setLoading(true);
      setshowaddAssignmentModal(false);

      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      if (data.pdf && data.pdf.length > 0) {
        formdata.append("docs", data.pdf[0]);
      }
      formdata.append("duedate", data.dueDate);

      const response = await coursespostApis(
        "/courses/create/assignments",
        formdata,
        queryParams
      );

      if (response.message) {
        showToastMessage(response.data.message, 200);
        // setDisabled(false)
        setLoading(false);
        closeModel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModel = async () => {
    setshowaddAssignmentModal(false);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await coursesgetApis(`/coursecontent`, queryParams);
        if (res) {
          setCourseData(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  return (
    <div className="p-6 pt-24 mx-16">
      <h2 className="text-2xl font-bold mb-4">
        coursename : {coursedetails.state.coursename}
      </h2>
      <h2 className="text-2xl font-semibold mb-4">
        description : {coursedetails.state.coursedescription}
      </h2>

      <h6 className="text-sm font-semibold mb-4">
        Duration : {coursedetails.state.duration}
      </h6>
      <h6 className="text-sm font-semibold mb-4">
        Price : {coursedetails.state.price}
      </h6>

      {role === "instructor" ? (
        <div className="flex justify-end mb-4 mr-16">
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => setshowaddAssignmentModal(true)}
          >
            Add Assignment
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded ml-8"
            onClick={() => {
              navigate(`/courses/${courseid}/add/modules`);
            }}
          >
            Add Module
          </button>
        </div>
      ) : (
        <></>
      )}

      {showaddAssignmentModal && (
        <AddAssignmentModal
          onClose={closeModel}
          onSubmit={handleAssignmentSubmit}
        />
      )}

      {loading && <Loader />}

      {!loading && !courseData && (
        <p className="py-4 text-3xl lg:text-4xl font-extrabold font-bold text-blue-600 text-center">
          No course material found, please add modules and lessons
        </p>
      )}

      {courseData && courseData.length == 0 ? (
        <p>No modules found, please add module</p>
      ) : (
        courseData.map((module: Coursemodule) => (
          <div key={module.id} className="mb-16 p-4 border rounded-lg">
            <div className="flex justify-end mb-4 mr-16">
              <button
                type="button"
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => {
                  navigate(`/courses/${courseid}/add/module/${module.id}`)
                }}
              >
                Add lesson
              </button>
            </div>

            <h3 className="text-lg font-semibold">
              Module Title: {module.title}
            </h3>
            <p className="text-gray-500 mb-4">
              Description: {module.description}
            </p>

            <h4 className="text-lg mb-5 font-bold text-gray-700 text-2xl">
              Lessons
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.lessons.length == 0 ? (
                <p>No lessons for module</p>
              ) : (
                module.lessons?.map((lesson: CourseModulelessons) => (
                  <div
                    key={lesson.id}
                    className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 bg-white p-4 shadow-lg"
                  >
                    {lesson.videoUrl && (
                      <div className="mb-2">
                        <ReactPlayer
                          width="100%"
                          height="auto"
                          src={lesson.videoUrl}
                          controls
                        />
                      </div>
                    )}
                    <h5 className="font-semibold text-lg mb-3 text-2xl text-gray-700 dark:text-gray-400">
                      Lesson Title: {lesson.title}
                    </h5>

                    <p className="text-gray-600 font-normal  mb-3">
                      Description: {lesson.description}
                    </p>

                    {lesson.fileUrl && (
                      <a
                        href={lesson.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-dark-blue text-white underline text-size-16"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Coursematerial;
