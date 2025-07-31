import { ReactNode, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import authApis from "../../../api/auth.api";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema, loginFormValidations } from "../models/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../../../utils/Loader";
// import { showToastMessage } from "../../../utils/Toast.errors";
import { useAuthContext } from "../../../hooks/Createcontext";
import { Getrolefromtoken } from "../../../utils/Getrolefromtoken";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showToastMessage } from "../../../utils/Toast.errors";

export const Login = () => {
  const [logindata, setLogindata] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { role, setRole, setAuthToken } = useContext(useAuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleconfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (Object.keys(logindata).length === 0) {
      return;
    }
    const registerUser = async () => {
      try {
        setLoading(true);
        const userDetailsToken = await authApis("/users/login", logindata);

        if (userDetailsToken) {
          setLoading(false);
          setAuthToken(userDetailsToken.token);
          setRole(Getrolefromtoken(userDetailsToken.token));
          showToastMessage(userDetailsToken.message,200);
          if (role === "instructor") {
            navigate("/dashboard");
          } else if (role === "student") {
            navigate("/student/home");
          }
        }
      } catch (error) {
        console.log(error);
        // showToastMessage("something went wrong",501);
      } finally {
        setLoading(false);
      }
    };
    registerUser();
  }, [logindata, navigate, role, setAuthToken, setRole]);

  const handleSubmitform: SubmitHandler<loginFormValidations> = (
    data: loginFormValidations
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newData } = data;
    setLogindata(newData);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div
      className="bg-dark-red p-12 max-w-md mx-auto shadow-md bg-dark-gray mt-20"
      style={{ backgroundColor: "rgb(245, 245, 245)" }}
    >
      <form onSubmit={handleSubmit(handleSubmitform)}>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h2>

        {loading && <Loader />}
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            className={`w-full px-3 py-2 border rounded mb-4 ${
              errors.email ? "border-red-500" : "border-gray-300"
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

{/*
        <div className="border mb-4 border-gray-300">
        
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className={`w-full px-3 py-2`}

            />
            <span
            onClick={togglePasswordVisibility}
            className="cursor-pointer absolute right-10px"
            >{showPassword ? <FaEyeSlash/> : <FaEye/>}</span>

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message as ReactNode}
            </p>
          )}

                  
        </div> */}

        <label className="block text-gray-700 font-semibold mb-1">
          Password:
        </label>
        
        <div className="relative mb-4">
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`w-full px-3 py-2 pr-10 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message as ReactNode}
            </p>
          )}
        </div>

        <label className="block text-gray-700 font-semibold mb-1">
            Confirm Password:
          </label>
        <div className="relative mb-4">
          
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className={`w-full px-3 py-2 border mb-4 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
            <span
            onClick={toggleconfirmPasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} 
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message as ReactNode}
            </p>
          )}
        </div>
        <label className="block text-gray-700 font-semibold mb-1">Role :</label>

        <select
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("role")}
        >
          <option defaultValue={"role"}>select your role</option>
          <option value="student">student</option>
          <option value="instructor">Instructor</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">
            {errors.role.message as ReactNode}
          </p>
        )}

        <Button label="login" type="submit" disableState={isSubmitting} />
        <Button
          label="reset"
          type="reset"
          disableState={isSubmitting}
          clickHandler={() => reset()}
        />
        <p className="mt-5 text-center font-semi-bold">
          Don't have an account ? <a href="/users/register">Sign up</a>
        </p>
      </form>
    </div>
  );
};
