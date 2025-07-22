import { Routes, Route } from "react-router-dom";
import  {Signup,Login,Verifyotp} from "./components/index";

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
