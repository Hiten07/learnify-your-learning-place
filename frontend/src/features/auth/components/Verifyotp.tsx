import { SubmitHandler, useForm, } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import authApis from "../../../api/auth.api";

type otpType = {
  otp?: string;
}

const Verifyotp = () => {

    const navigate = useNavigate();
    const token = useLocation();
    const [otp,setOtp] = useState({token: token.state});
    const { register,handleSubmit,reset,formState: {errors,isSubmitting} } = useForm();
    
    useEffect(() => {

      if(!Object.prototype.hasOwnProperty.call(otp, 'otp')) {
        return
      }

      const verifyOtp = async () => {
        const userDetailsToken = await authApis("/users/register/verify",otp);

        if(userDetailsToken) {
          navigate("/users/login");
        }
      } 
      verifyOtp();
    },[otp,navigate])

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
                      },
                      maxLength: {
                        value: 6,
                        message: "otp must be of only 6 digits"
                      }
                  })}>
              </input>

              <Button label="submit" type="submit" disableState={isSubmitting}/>
              <Button label="reset" type="reset" disableState={isSubmitting} clickHandler={() => reset()}/>
              
            </form>
    </div>
  )
}

export default Verifyotp
