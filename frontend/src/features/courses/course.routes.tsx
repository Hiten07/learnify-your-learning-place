import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Coursematerial from "./components/Coursematerial";
import Addcourse from "./components/Addcourse";
import Coursehistory from "./components/Coursehistory";
import { FC } from "react";

export const CourseRoutes: FC = () => {
  return (
    <Routes>
        <Route index element={<Dashboard />} />
        <Route path={"/add-course"} element={<Addcourse/>} />
        <Route path={"/history"} element={<Coursehistory/>} />
        <Route path={"/:courseid"} element={<Coursematerial />} />
    </Routes>
  );
};
