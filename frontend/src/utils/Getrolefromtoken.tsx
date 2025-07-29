import { jwtDecode } from "jwt-decode";

const Getrolefromtoken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.roles;
  } 
  catch (error) {
    console.log(error);
  }
};

export { Getrolefromtoken }
