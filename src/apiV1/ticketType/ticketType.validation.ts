import Joi from "@hapi/joi";
import { TicketType } from "./ticketType.typings";

export function validateTicketType(profile: TicketType) {
  const schema = Joi.object().keys({
    eventId: Joi.string().required(),
    ticketType: Joi.string(),
    price: Joi.number().min(0),
    numberOfTicketsAvailable: Joi.number().min(0)
  });

  return schema.validate(profile, {
    abortEarly: false,
    skipFunctions: false,
    stripUnknown: true
  });
}
