import Joi from "@hapi/joi";
import { Ticket } from "./ticket.typings";

export function validateTicket(profile: Ticket) {
  const schema = Joi.object().keys({
    eventId: Joi.string()
      .min(10)
      .max(255),
    ticketTypeId: Joi.string()
      .min(10)
      .max(255),
    numberOfTickets: Joi.number().greater(0),
    price: Joi.number().greater(0),
    userId: Joi.string()
  });

  return schema.validate(profile, {
    abortEarly: false,
    skipFunctions: false,
    stripUnknown: true
  });
}
