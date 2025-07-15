import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import Dashboard from "./components/Dashboard";

export const CourseRoutes: FC = () => {
  return (
    <Routes>
        <Route index element={<Dashboard />} />
    </Routes>
  );
};
