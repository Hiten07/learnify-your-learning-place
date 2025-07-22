import 'react-toastify/dist/ReactToastify.css';
import { axiosinstance } from './Responseinterceptors';
import { AxiosRequestConfig } from 'axios';
import { showToastMessage } from '../utils/Toast.errors';

const coursesgetApis = async (endpoint: string,queryParams: AxiosRequestConfig['params']) => {
    try {
        const result = await axiosinstance.get(endpoint,
        {
            // validateStatus: () => true,
            params: queryParams,    
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if(result && result.data) {
            return result.data;
        }
        else {
            showToastMessage("internal server error",500);
        }
        
    } catch (error) {
        console.log(error);
    }   
}

const coursespostApis = async (endpoint: string,data: unknown,queryParams: AxiosRequestConfig['params']) => {
    try {
        const result = await axiosinstance.post(endpoint,data,
        {
            // validateStatus: () => true,
            params: queryParams,
            headers: data instanceof FormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' },
        })
        if(result.data) {
            return result?.data;
        }
        else {
            showToastMessage("internal server error",500);
        }
        
    } catch (error) {
        console.log(error);
    }   
}
export { coursesgetApis,coursespostApis };