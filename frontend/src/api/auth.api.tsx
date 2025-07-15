// import { showToastMessage } from '../utils/Toast.errors';
import 'react-toastify/dist/ReactToastify.css';
import { axiosinstance } from './Responseinterceptors';

const authApis = async (endpoint: string,data: unknown) => {

    const postdata = JSON.stringify(data);  

    try {
        const result = await axiosinstance.post(endpoint,
            postdata,
        {
            // validateStatus: () => true,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        // showToastMessage(result.data.message,result.status)
        if(result.data.token) {
            return result.data;
        }
        
    } catch (error) {
        console.log(error)
    }   
}
export default authApis;