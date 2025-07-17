import 'react-toastify/dist/ReactToastify.css';
import { axiosinstance } from './Responseinterceptors';
import { AxiosRequestConfig } from 'axios';
import { showToastMessage } from '../utils/Toast.errors';

const coursesApis = async (endpoint: string,queryParams: AxiosRequestConfig['params']) => {

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
export default coursesApis;