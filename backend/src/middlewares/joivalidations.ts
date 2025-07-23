import { Request, Response, NextFunction } from "express";
import { signupjoischema,loginSchema } from "../validators/validators";
import { customError } from "../errors/customError";

export const authValidations = {
  async signupschema(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = signupjoischema.validate(req.body);
      if (error) {
        res.status(401).json({
          data: null,
          message: error.details[0].message,
        });
      } 
      else {
        next();
    }
    } catch (error) {
        throw new customError("VALIDATION_ERROR","Something went wrong while checking validations");
    }
  },

  async loginschema(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        res.status(401).json({
          data: null,
          msg: error.details[0].message,
        });
      } 
      else {
        next();
    }
    } catch (error) {
        throw new customError("VALIDATION_ERROR","Something went wrong while checking validations");
    }
  },
};
