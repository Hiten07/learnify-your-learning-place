import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import { FC } from "react";

export const InstructorRoutes: FC = () => {
  return (
    <Routes>
        <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
