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
        console.log(data.message);
      } 
  
      return response;
    },
    (error) => {
      const responsedata = error.response;
      if (responsedata.data?.message && responsedata?.status && (responsedata?.status === 400 || responsedata?.status === 401 
        || responsedata?.status === 402 || responsedata?.status === 403 || responsedata?.status === 404)) {
        toast.error(responsedata.data.message);
      }
      else if (responsedata.data?.message && responsedata?.status && (responsedata?.status === 500 || responsedata?.status === 500)) {
        toast.error('Server error - try again later');
      } 
      else if(responsedata.data?.message && !responsedata.status) {
        //  validation error for any input
        toast.error(responsedata.data.message); 
      }
      else  {
        toast.info("internal server error");
      }
  
      return Promise.reject(responsedata);
    }
  );