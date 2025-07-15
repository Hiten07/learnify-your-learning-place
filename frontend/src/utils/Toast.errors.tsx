import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

export const showToastMessage = (msg: string,resultstatus: number) => {
    console.log(resultstatus)
    switch (resultstatus) {
        case 200:
            toast.success(msg, {
                position: "top-right"
              });
              break;
        case 401:
            toast.error(msg,{
                position: "top-right"
            })
            break;
        case 404:
            toast.error(msg,{
                position: "top-right"
            })
            break;
        case 501:
            toast.info(msg,{
                position: "top-right"
            })
            break;
        default:
            toast(msg,{
                position: "top-right"
            })
            break;  
      }
};