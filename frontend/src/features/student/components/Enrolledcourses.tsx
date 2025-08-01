
import { useEffect, useState,useCallback } from "react";
import {getApis} from "../../../api/course.api";
import { useNavigate } from "react-router-dom";
import {coursedetails} from "../../courses/types/courses.types";
import { convertStringDate } from "../../../utils/Convertstringtodate";

const Enrolledcourses = () => {

  const navigate = useNavigate();
  const [coursedata, setCoursedata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 1,
  });

  const queryParams = {
    page: "1",
    sortBy: "courseprice",
    sortType: "asc"
  };

//    const getISTTime = (date: Date | string) => {
//     let ndate: Date = new Date(date);
//     ndate.setHours(ndate.getHours() + 5);
//     ndate.setMinutes(ndate.getMinutes() + 30);
  
//     let currentTimestamp = ndate.toISOString();
//     console.log(currentTimestamp);
  
//     let timestampDate = currentTimestamp.slice(0, 10);
//     return timestampDate;
//   };

  const fetchAllInstructorCourses = useCallback(async () => {
    try 
    {
      setLoading(true);
      const response = await getApis("/student/courses", queryParams);
      
      if (response.data.courses.length > 0) {
        setCoursedata(response.data.courses);
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
    console.log(coursedetails)
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
  
  return (
    <div className="container mx-auto mt-10 p-8 border-2 border-indigo-600">
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
        ) : coursedata.length > 0 && 
        
        (
            <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coursedata.map((course: coursedetails) => (
                           <div
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            key={course.courseid}
                          >
                            <div>
                                <h5 className="text-xl font-semibold mb-2">
                                {course.coursename}
                                </h5>
                                <p className="text-gray-600 mb-4">
                                description: {course.description}
                                </p>
                            </div>

                           <div>
                                <p className="text-lg text-gray-700">
                                    <span className="font-semibold">Price: </span>
                                    {course.courseprice}
                                </p>
                                
                                <p className="text-sm text-gray-500">
                                    Duration: {course.duration} Days
                                </p>

                                <p className="text-sm text-gray-500">
                                    Valid Till: {convertStringDate(course.enrolledcourses[0]!.validuntildate)}
                                </p>
                           </div>
                            
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
  )
}

export default Enrolledcourses;
