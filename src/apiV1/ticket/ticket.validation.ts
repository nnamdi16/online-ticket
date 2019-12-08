import Joi from "@hapi/joi";
import { TicketType } from "./ticket.typings";

export function validateEvent(profile: TicketType) {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(2)
      .max(255)
      .required(),
    description: Joi.string()
      .min(5)
      .max(5000),
    location: Joi.string()
      .min(2)
      .max(255),
    category: Joi.string()
      .min(2)
      .max(255),
    startDate: Joi.date()
      .less("now")
      .required(),
    endDate: Joi.date().less("now"),
    time: Joi.string(),
    noOfAttendees: Joi.number().greater(0)
  });

  return schema.validate(profile, {
    abortEarly: false,
    skipFunctions: false,
    stripUnknown: true
  });
}
