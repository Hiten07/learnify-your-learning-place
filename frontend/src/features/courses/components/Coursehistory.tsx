import { useEffect, useState } from "react";
import { Loader } from "../../../utils/Loader";
import { coursesgetApis } from "../../../api/course.api";
import DataTable from "react-data-table-component";

const Coursehistory = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await coursesgetApis(`/courses/history`, {});
        if (res) {
          setApiData(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);


  const tableData = apiData.flatMap((course) => 
    course.enrolledcourses?.map((enrolled) => ({
      coursename: course.coursename,
      description: course.description,
      enrolleddate: enrolled.enrolleddate,
      firstname: enrolled.users?.firstname || "-",
      lastname: enrolled.users?.lastname || "-",
      email: enrolled.users?.email || "-",
    }))
  );

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
      selector: (row: { enrolleddate: string}) => row.enrolleddate,
      sortable: true,
    },
    {
      name: "Student Name",
      selector: (row: { enrolled: string}) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { coursename: string}) => row.email,
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

