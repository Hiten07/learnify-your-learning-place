import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Verifyotp from "./components/Verifyotp";
import Login from "./components/Login";
import { FC } from "react";

export const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Signup />} />

      <Route path="/verify-otp" element={<Verifyotp />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
