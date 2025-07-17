import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import coursesApis from "../../../api/course.api";
import ReactPlayer from "react-player";

const Coursematerial = () => {
  const { courseid, } = useParams();
  const coursedetails = useLocation();
  const [courseData, setCourseData] = useState(null);

  const queryParams = {
    courseid: courseid,
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await coursesApis(`/coursecontent`, queryParams);
      if (res) {
        setCourseData(res);
      }
    };

    fetchCourse();
  }, []);
  console.log(courseData);

  if (!courseData) return <p>Loading...</p>;

  return (
    <div className="p-6 pt-24">
      <h2 className="text-2xl font-bold mb-4">coursename : {coursedetails.state.coursename}</h2>
      <h2 className="text-2xl font-semibold mb-4">description : {coursedetails.state.coursedescription}</h2>

      <p className="text-sm font-semibold mb-4">Duration : {coursedetails.state.duration}</p>
      <p className="text-sm font-semibold mb-4">Price : {coursedetails.state.price}</p>
    

      {courseData.map((module) => (
        <div key={module.id} className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">
            Module Title: {module.title}
          </h3>
          <p className="text-gray-500 mb-4">
            Description: {module.description}
          </p>

          <h4 className="text-md font-medium">Lessons</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.lessons?.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white p-4 border rounded-lg shadow-lg"
              >
                <h5 className="font-semibold text-lg">
                  Lesson Title: {lesson.title}
                </h5>
                <p className="text-gray-600 mb-2">
                  Description: {lesson.description}
                </p>

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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coursematerial;
