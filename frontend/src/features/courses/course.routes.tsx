import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Coursematerial from "./components/Coursematerial";
import { FC } from "react";

export const CourseRoutes: FC = () => {
  return (
    <Routes>
        <Route index element={<Dashboard />} />
        <Route path={"/courses/:courseid"} element={<Coursematerial />} />
    </Routes>
  );
};
