import { Request, Response, NextFunction } from "express";
import { catchResponse } from "../errors/helperError";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const verifyToken = (role: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.authtoken;

      if (!token) {
        res.status(500).json({
          message: "no token found",
        });
        return;
      }
      const data = jwt.verify(
        token as string,
        process.env.JWT_SECRET_KEY as string
      ) as CustomJwtPayload;

      console.log(role)
      console.log(data)
      console.log(data.roles)

        if (!role.includes(data.roles)) {
          // console.log("role not fund")
          res.status(403).json({
            message: "access denied for user"
          })
          return;
        } else {
          req.user = data;
          next();
        }
   
    } catch (error: unknown) {
      // res.clearCookie('access_token');
      catchResponse(res, error as Error);
    }
  };
};

export { verifyToken };
