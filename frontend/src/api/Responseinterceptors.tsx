import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import { showToastMessage } from '../utils/Toast.errors';
import Cookies from 'js-cookie';
import axios from 'axios';


export const axiosinstance = axios.create({
    baseURL: "http://localhost:3007",
    withCredentials: true
})

axiosinstance.interceptors.request.use(
    (config) => {
    if(config.url == "/users/login" || config.url == '/users/register' || config.url == "/users/verify-otp") {
        return config;
    }
      const token = Cookies.get('authtoken');  
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; }
      else {
        showToastMessage("Please login your account...", 401);
        window.location.href = "/users/login"; 
      }
      console.log(config)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

axiosinstance.interceptors.response.use(
    (response) => {
      const data = response?.data;
  
      if (data?.message && typeof data?.message === 'string') {
        toast.success(data.message);
      } 

    //   else if (data?.status && typeof data?.status === 'string') {
    //     toast.success(data.status + ` - Status code: ${data.code}`);
    //   }
  
      return response;
    },
    (error) => {
      const data = error.response.data;
    
      if (data?.message && data?.status && (data?.status === 401 || data?.status === 402 || data?.status === 403 || data?.status === 404)) {
        toast.error(data.message);
      }
      else if (data?.message && data?.status && (data?.status === 500 || data?.status === 500)) {
        toast.error('Server error - try again later');
      } 
      else if(data?.message && !data.status) {
        //  validation error for any input
        toast.error(data.message); 
      }
      else {
        toast.info("internal server error");
      }
  
      return Promise.reject(data);
    }
  );