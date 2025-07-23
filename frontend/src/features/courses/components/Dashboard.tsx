import { useEffect, useState,useCallback } from "react";
import {coursesgetApis} from "../../../api/course.api";
import { useNavigate } from "react-router-dom";
import { coursedetails } from "../types/courses.types";


const Dashboard = () => {
  const navigate = useNavigate();
  const [coursedata, setCoursedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCoursesCreated, setTotalCourseCreated] = useState(0);

  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
  });

  const queryParams = {
    page: "1",
    sortBy: "duration",
    sortType: "asc"
  };


  const fetchAllInstructorCourses = useCallback(async () => {
    try 
    {
      setLoading(true);
      const response = await coursesgetApis("/courses/mycourses", queryParams);
     
      if (response.data.courses.length > 0) {
        setCoursedata(response.data.courses);
        setTotalCourseCreated(response.data.totalItems);
        setPagination({
          page: response.data.currentPage,
          totalPages: response.data.totalPages,
        });
      }

      setLoading(false);
    } 
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  },[queryParams])

  const Viewcoursematerial = async (coursedetails: coursedetails) => {
    const course = {
      coursename: coursedetails.coursename,
      coursedescription: coursedetails.description,
      duration: coursedetails.duration,
      price: coursedetails.courseprice
    }

    navigate(`/courses/${coursedetails.courseid}`,{
      state: course
    })
  }

  const handlePaginationChange = (newPage: number) => {
    queryParams.page = newPage.toString();
    fetchAllInstructorCourses();
  };

  useEffect(() => {
    fetchAllInstructorCourses();
  }, []);

  const totalCoursesPurchased = 123;
  const amountGenerated = 100000;

  return (
    <div className="container mx-auto p-8">
      <h4 className="text-2xl font-bold mb-8">My Courses</h4>

      {!loading && coursedata.length == 0 && (
        <div className="text-center text-lg text-blue-500 mb-4">
          No course found, please create course
        </div>
      )}

      {loading ? (
        <div className="text-center text-lg text-blue-500 mb-4">
          Fetching courses...
        </div>
      ) : coursedata.length > 0 && (
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
                        onClick={() => Viewcoursematerial(course)} 
                        className="mt-8 text-sm text-white p-2 rounded cursor-pointer" style={{backgroundColor: "darkblue-600",fontSize: "12px"}}
                        >
                    view course material
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
