import { Routes, Route } from "react-router-dom";
import { FC } from 'react';
import Dashboard from "../student/components/Dashboard";
import Enrolledcourses from "./components/Enrolledcourses";
import Assignments from "./components/Assignments";

export const StudentRoutes : FC = () => {
  return (
    <Routes>
        <Route path="/home" element={<Dashboard/>} />
        <Route path="/mycourses" element={<Enrolledcourses/>} />
        <Route path="/assignments" element={<Assignments/>} />
    </Routes>
  )
}
