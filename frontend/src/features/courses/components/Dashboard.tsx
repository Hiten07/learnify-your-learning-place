import { useEffect, useState } from "react";
import coursesApis from "../../../api/course.api";

const Dashboard = () => {
  const [coursedata, setCoursedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCoursesCreated, setTotalCourseCreated] = useState(0);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
  });

  const queryParams = {
    page: "0",
    sortBy: "duration",
    sortType: "asc"
  };

  const fetchAllInstructorCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesApis("/courses/mycourses", queryParams);
      setCoursedata(response.data.courses);
      setTotalCourseCreated(response.data.totalItems);
      setPagination({
        page: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
      console.log(response);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handlePaginationChange = (newPage) => {
    queryParams.page = newPage.toString();
    fetchAllInstructorCourses();
  };

  useEffect(() => {
    fetchAllInstructorCourses();
  }, []);

  const totalCoursesPurchased = 0;
  const amountGenerated = 100000;

  return (
    <div className="container mx-auto p-8">
      <h4 className="text-2xl font-bold mb-8">My Courses</h4>

      {loading ? (
        <div className="text-center text-lg text-blue-500 mb-4">
          Fetching courses...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h5 className="text-xl font-semibold mb-2">
                Total Courses Created
              </h5>
              <p className="text-2xl text-gray-700">{totalCoursesCreated}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h5 className="text-xl font-semibold mb-2">
                Total Courses Purchased
              </h5>
              <p className="text-2xl text-gray-700">{totalCoursesPurchased}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h5 className="text-xl font-semibold mb-2">Amount Generated</h5>
              <p className="text-2xl text-gray-700">
                {amountGenerated.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursedata.map((course) => (
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
                  Duration: {course.duration} mins
                </p>
              </div>
            ))}

            <div className="pagination">
              <button
                className="bg-dark-blue"
                disabled={pagination.page < 1}
                onClick={() => handlePaginationChange(pagination.page - 1)}
              >
                Prev
              </button>
              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handlePaginationChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
