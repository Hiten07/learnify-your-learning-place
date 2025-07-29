import jwt, { JwtPayload } from "jsonwebtoken";
import * as cookie from "cookie";

export const getUserDetailsFromToken = (socket: any) => {

    let cookies = cookie.parse(socket.handshake.headers.cookie || "");

    if (!cookies) {
        console.warn("No cookies found in headers");
        return null;
      }
    let usercookie = cookies.authtoken;
    if(usercookie) {
        try {
            let decodedUserToken = jwt.verify(
              usercookie as string,
              process.env.JWT_SECRET_KEY as string
            ) as JwtPayload;

            return decodedUserToken;
          }
          catch(error) {
              console.log(error);
          }
    }
}