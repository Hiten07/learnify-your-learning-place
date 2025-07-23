import { showToastMessage } from "../utils/Toast.errors";
import { axiosinstance } from "./Responseinterceptors";
// import { useState, useCallback } from "react";
// import { AxiosRequestConfig, AxiosResponse } from "axios";
import "react-toastify/dist/ReactToastify.css";

// export const useCustomApi = () => {

//   const [data,setData] = useState(null)
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getrequest = useCallback(async (endpoint: string, config: AxiosRequestConfig) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosinstance.get(endpoint, config);
//       setData(response.data);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const get = useCallback(
//     (endpoint: string, config) => {
//       getrequest(endpoint, config);
//     },
//     [getrequest]
//   );
//   return { data,error, loading, get };
// };

const authApis = async (endpoint: string, data: unknown) => {
  const postdata = JSON.stringify(data);

  try {
    const result = await axiosinstance.post(endpoint, postdata, {
      // validateStatus: () => true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.data.token) {
      return result.data;
    } 
    else {
      return result;
    }
  } catch (error) {
    if (error?.response?.data) {
      return;
    }
    if(!error) {
      showToastMessage("Internal server error", 500);
    }
  }
};
export default authApis;
