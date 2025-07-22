import { ReactNode, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import authApis from "../../../api/auth.api";
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema,loginFormValidations } from "../models/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../../../utils/Loader";
import { showToastMessage } from "../../../utils/Toast.errors";

export const Login = () => {
  const [logindata, setLogindata] = useState({});
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(logindata).length === 0) {
      return;
    }
    const registerUser = async () => {
      try {
        setLoading(true);
        const userDetailsToken = await authApis(
          "/users/login",
          logindata
        );
        if (userDetailsToken) {
          // navigate("/dashboard",{
          //   state: Cookies.get("authtoken")
          // })
          setLoading(false)
          window.location.href = "/dashboard";
        }
        
      } catch (error) {
        console.log(error)
        showToastMessage("something went wrong",501);
      }
      finally {
       
        setLoading(false);
      }
    };
    registerUser();
  }, [logindata,navigate]);

  const handleSubmitform : SubmitHandler<loginFormValidations> = (data: loginFormValidations) => {
    
    const {confirmPassword,...newData} = data;
    console.log(confirmPassword)
    setLogindata(newData)
  }

  const { register, reset, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(loginSchema)
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

        {loading && <Loader/>}
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
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message as ReactNode}
            </p>
          )}

                  <label className="block text-gray-700 font-semibold mb-1">
                    Confirm Password:
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                    })}
                    type="password"
                    placeholder="Confirm password"
                    className={`w-full px-3 py-2 border mb-4 ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
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

        <Button label="login" type="submit" disableState={isSubmitting}/>
        <Button label="reset" type="reset" disableState={isSubmitting} clickHandler={() => reset()}/>
<p className="mt-5 text-center font-semi-bold">Don't have an account ? <a href="/users/register">Sign up</a></p>

              </form>
    </div>
  );
};

