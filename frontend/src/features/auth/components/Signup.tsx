import { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm, } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import authApis from "../../../api/auth.api";
import "../../../App.css";


type Inputs = {
  firstname?: string,
  lastname?: string,
  email?: string,
  phonenumber?: string,
  password?: string,
  role?: string
}

const Signup = () => {
    
    const [userData,setUserdata] = useState({});
    const { register,handleSubmit,formState: {errors,isSubmitting} } = useForm();
    const navigate = useNavigate();

  useEffect(() => {

    if(Object.keys(userData).length === 0) {
        return;
    }
    const registerUser = async () => {
        try {
            const userDetailsToken = await authApis("/users/register",userData);
            if(userDetailsToken) {
                navigate("/verify-otp",{
                    state: userDetailsToken
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    registerUser();
  },[userData])
    
  const handleSubmitform: SubmitHandler<Inputs> = async (data) => {
      // await new Promise((resolve) => setTimeout(resolve,5000))
      const role = data.role 
      data.role = role?.split() as string[];
      setUserdata(data);
   }    
  return (
    <div className="bg-dark-red p-12 max-w-md mx-auto shadow-md bg-dark-gray mt-20"  style={{backgroundColor : "rgb(245, 245, 245)"}}>
    <form onSubmit={handleSubmit(handleSubmitform)} className="bg-red">
    <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Sign up        
    </h2>
      <label className="block text-gray-700 font-semibold mb-1">
        Firstname : 
      </label>
      <input
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.title ? "border-red-500" : "border-gray-300"
        }`}
        {...register("firstname", {
          required: true,
          minLength: {
            value: 2,
            message: "Firstname must have length of 2",
          },
        })}
      />
      {errors.firstname && (
        <p className="text-red-600 text-sm mt-1">{errors.firstname.message as ReactNode}</p>
      )}
  
      <br />
      <br />
  
      <label className="block text-gray-700 font-semibold mb-1">
        Lastname : 
      </label>
      <input
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.lastname ? "border-red-500" : "border-gray-300"
        }`}
        {...register("lastname", {
          required: true,
          minLength: {
            value: 2,
            message: "Lastname must have length of 2",
          },
        })}
      />
      {errors.lastname && (
        <p className="text-red-600 text-sm mt-1">{errors.lastname.message as ReactNode}</p>
      )}
  
      <br />
      <br />
  
      <label className="block text-gray-700 font-semibold mb-1">
        email : 
      </label>
      <input
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
        {...register("email", {
          required: true,
        })}
      />
      {errors.email && (
        <p className="text-red-600 text-sm mt-1">{errors.email.message as ReactNode}</p>
      )}
  
      <br />
      <br />
  
      <label className="block text-gray-700 font-semibold mb-1">
        phone number : 
      </label>
      <input
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.phonenumber ? "border-red-500" : "border-gray-300"
        }`}
        {...register("phonenumber", {
          required: true,
        })}
      />
      {errors.phonenumber && (
        <p className="text-red-600 text-sm mt-1">{errors.phonenumber.message as ReactNode}</p>
      )}
  
      <br />
      <br />
  
      <label className="block text-gray-700 font-semibold mb-1">
        Password : 
      </label>
      <input
        type="password"
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.password ? "border-red-500" : "border-gray-300"
        }`}
        {...register("password")}
      />
      {errors.password && (
        <p className="text-red-600 text-sm mt-1">{errors.password.message as ReactNode}</p>
      )}
  
      <br />
      <br />
  
      <label className="block text-gray-700 font-semibold mb-1">
        Role : 
      </label>
  
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
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded cursor-pointer"
        >
        value={isSubmitting ? "submitting" : "submit"}
      </button>
    </form>
  </div>
  
  )
}

export default Signup;
