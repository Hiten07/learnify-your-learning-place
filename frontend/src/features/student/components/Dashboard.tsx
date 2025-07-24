import { useEffect, useState, useCallback } from "react";
import { coursesgetApis } from "../../../api/course.api";
import { Loader } from "../../../utils/Loader";
import { coursedetails } from "../../courses/types/courses.types";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();
  const [coursedata, setCoursedata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
  });

  const queryParams = {
    page: "1",
    sortBy: "duration",
    sortType: "asc",
  };

  const fetchAllCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await coursesgetApis("/student/allcourses", queryParams);  

      if (response.data.courses.length > 0) {
        setCoursedata(response.data.courses);
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
  }, [queryParams]);

  const handlePaginationChange = (newPage: number) => {
    queryParams.page = newPage.toString();
    fetchAllCourses();
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-8 border-2 border-indigo-600">
      <h4 className="text-2xl font-bold mb-8">My Assignments</h4>

      {!loading && coursedata.length === 0 && (
        <div className="text-center text-lg text-blue-500 mb-4">
          No assignments found
        </div>
      )}

      {loading && <Loader />}

      {loading ? (
        <div className="text-center text-lg text-blue-500 mb-4">
          Fetching courses...
        </div>
      ) : coursedata.length > 0 && (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursedata.map((course: coursedetails) => (
              <div
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                key={course.courseid}
              >
                <h5 className="text-xl font-semibold mb-2">
                  {course.coursename}
                </h5>
                <p className="text-gray-600 mb-4">
                  description: {course.description}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Price: </span>
                  {course.courseprice}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {course.duration} Days
                </p>
                
                <button type="button" 
                        // onClick={() => Viewcoursematerial(course)} 
                        className="mt-8 text-sm text-white p-2 rounded cursor-pointer" style={{backgroundColor: "darkblue-600",fontSize: "12px"}}
                        >
                    Enroll in course
                </button>
              </div>
            ))}

        
          </div>
          
          <div className="pagination flex content-center justify-center">
              <button
                className="mt-8 w-24 text-white font-semibold py-2 rounded cursor-pointer" style={{backgroundColor: "darkblue-600"}}
                disabled={pagination.page <= 1}
                onClick={() => handlePaginationChange(pagination.page - 1)}
              >
                Prev
              </button>

              <span
                className="font-semibold mt-12 m-5" 
              >
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <button
                className="mt-8 w-24 text-white font-semibold py-2 rounded cursor-pointer" style={{backgroundColor: "darkblue-600"}}
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handlePaginationChange(pagination.page + 1)}
              >
                Next
              </button>
          </div>
        </>
      )}

    </div>
  );
};
export default Dashboard;
