// import { showToastMessage } from '../utils/Toast.errors';
import 'react-toastify/dist/ReactToastify.css';
import { axiosinstance } from './Responseinterceptors';
import { AxiosRequestConfig } from 'axios';

const coursesApis = async (endpoint: string,queryParams: AxiosRequestConfig['params']) => {

    try {
        const result = await axiosinstance.get(endpoint,
        {
            params: queryParams,
            // validateStatus: () => true,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if(result.data) {
            return result.data;
        }
        
    } catch (error) {
        console.log(error)
    }   
}
export default coursesApis;