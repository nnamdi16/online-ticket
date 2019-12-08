import Joi from "@hapi/joi";
import { TransactionType } from "./transaction.typings";

export function validateTransaction(profile: TransactionType) {
  const schema = Joi.object().keys({
    transactionId: Joi.string(),
    eventId: Joi.string().required(),
    ticketId: Joi.string().required(),
    amount: Joi.number()
      .min(2)
      .max(255),
    userId: Joi.string().required()
  });

  return schema.validate(profile, {
    abortEarly: false,
    skipFunctions: false,
    stripUnknown: true
  });
}
