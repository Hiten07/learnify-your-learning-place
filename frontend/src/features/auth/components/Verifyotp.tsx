import { SubmitHandler, useForm, } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import authApis from "../../../api/auth.api";

type otpType = {
  otp?: string;
}

const Verifyotp = () => {


    const token = useLocation();
    const [otp,setOtp] = useState({token: token.state});
    const { register,handleSubmit,formState: {errors,isSubmitting} } = useForm();
    
    useEffect(() => {

      if(!Object.prototype.hasOwnProperty.call(otp, 'otp')) {
        return
      }

      const verifyOtp = async () => {
        console.log(otp)
        const userDetailsToken = await authApis("/users/register/verify",otp);
        console.log(userDetailsToken)
      }
      verifyOtp();
    },[otp])

    const handleSubmitform: SubmitHandler<otpType> = async (data) => {

        setOtp(prevdata => ({
          ...prevdata,
          otp: data.otp
        }))
     }  
  return (
    <div className="bg-dark-red p-12 max-w-md mx-auto shadow-md bg-dark-gray mt-20"  style={{backgroundColor : "rgb(245, 245, 245)"}}>
            <form onSubmit={handleSubmit(handleSubmitform)}>
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
              OTP verification
            </h2>
              <label className="block text-gray-700 font-semibold mb-1">
                  otp : 
              </label>

              <input 
                 className={`w-full mt-4 px-3 py-2 border rounded mb-4 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                  {...register("otp",{
                      required: true,
                      minLength: {
                          value: 6,
                          message: "otp must be of 6 digits"
                      }
                  })}>
              </input>
              
              
              <button 
                type="submit" 
                disabled={isSubmitting} 
                 className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
                 >{isSubmitting ? "submitting" : "submit"}</button>
            </form>
    </div>
  )
}

export default Verifyotp
