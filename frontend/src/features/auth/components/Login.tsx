import { useForm } from "react-hook-form";
import { ReactNode, useState,useEffect } from "react";
import authApis from "../../../api/auth.api";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [logindata, setLogindata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(logindata).length === 0) {
      return;
    }
    const registerUser = async () => {
      try {
        const userDetailsToken = await authApis(
          "/users/login",
          logindata
        );
        if (userDetailsToken) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    };
    registerUser();
  }, [logindata]);

  function handleSubmitform(data: any) {
    console.log("Login data:", logindata);
    setLogindata(data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div
      className="bg-dark-red p-12 max-w-md mx-auto shadow-md bg-dark-gray mt-20"
      style={{ backgroundColor: "rgb(245, 245, 245)" }}
    >
      <form onSubmit={handleSubmit(handleSubmitform)}>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h2>

        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            className={`w-full px-3 py-2 border rounded mb-4 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", {
              required: "Email is required",
            })}
            type="text"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">
              {errors.email.message as ReactNode}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Password:
          </label>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Enter your password"
            className={`w-full px-3 py-2 border mb-4 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message as ReactNode}
            </p>
          )}
        </div>

        <label className="block text-gray-700 font-semibold mb-1">Role :</label>

        <select
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("role")}
        >
          <option value="student">student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
