import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { Loader } from "../../../utils/Loader";
import { getApis } from "../../../api/course.api";
import { Coursepurchasehistory,Enrolledcoursesandusersdetails } from "../types/courses.types";
import { convertStringDate } from "../../../utils/Convertstringtodate";

const Coursehistory = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getApis(`/courses/history`, {});
        if (res) {
          setApiData(res.data.rows);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

    
  const tableData = apiData?.flatMap((course: Coursepurchasehistory) =>
    course.enrolledcourses?.map((enrolled: Enrolledcoursesandusersdetails) => ({
      coursename: course?.coursename,
      description: course?.description,
      enrolleddate: enrolled?.enrolleddate,
      firstname: enrolled?.users?.firstname || "-",
      lastname: enrolled?.users?.lastname || "-",
      email: enrolled?.users?.email || "-",
    })) || []
  ) || [];


  const columns = [
    {
      name: "Course Title",
      selector: (row: { coursename: string}) => row.coursename,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: { description: string}) => row.description,
      sortable: true,
    },
    {
      name: "Enrolled Date",
      selector: (row: { enrolleddate: string}) => convertStringDate( row.enrolleddate ),
      sortable: true,
    },
    {
      name: "Student Name",
      selector: (row: { firstname: string,lastname: string}) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { email: string}) => row.email,
      sortable: true,
    },
  ];

  return (
    <div className="p-6 pt-24">
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          title="Purchase course History"
          columns={columns}
          data={tableData}
          pagination
          highlightOnHover
          pointerOnHover
          noDataComponent="No course history found"
          responsive
        />
      )}
    </div>
  );
};

export default Coursehistory;

