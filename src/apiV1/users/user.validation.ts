import Joi from "@hapi/joi";
import { UserType } from "./user.typings";

export function validateUser(profile: UserType) {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .lowercase()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    firstName: Joi.string()
      .min(2)
      .max(255),
    lastName: Joi.string()
      .min(2)
      .max(255),
    username: Joi.string()
      .min(2)
      .max(255)
  });

  return schema.validate(profile, {
    abortEarly: false,
    skipFunctions: false,
    stripUnknown: true
  });
}
