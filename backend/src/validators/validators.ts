import Joi from "joi"

export const signupjoischema = Joi.object({
  firstname: Joi
            .string()
            .required()
            .min(2)
            .messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),

  lastname: Joi.string().min(2).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),

  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
   phonenumber: Joi
                .string()
                .required()
                .regex(/^[0-9]{10}$/)
                .messages({
                  "string.base": "Phone number must be string",
                  "string.empty": "Phone number is required",
                  'string.pattern.base': `Phone number must have 10 digits.`}
                ),

    password: Joi.string()
    .min(6)
    .max(20)
    .custom((value: string,helper: Joi.CustomHelpers) => {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helper.message({
          custom: "Password must contain at least 1 letter and 1 number.",
        });
      }
      return value;
    })
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 20 characters",
      "string.pattern.base":
        "Password must contain at least one letter and one number",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),


  role:Joi.string() 
        .min(1)
        .required().messages({
    "any.required": "Role is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "string.pattern.base": "Email must be a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string().required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  role: Joi.string().required().messages({
    "string.base": "Role must be a string",
    "string.empty": "Role is required",
    "any.required": "Role is required",
  }),
});
