import { jwtDecode } from "jwt-decode";

const Getrolefromtoken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded!.roles;
  } 
  catch (error) {
    console.log(error);
  }
};

const Getidfromtoken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } 
  catch (error) {
    console.log(error);
  }
};

export { Getrolefromtoken, Getidfromtoken }
