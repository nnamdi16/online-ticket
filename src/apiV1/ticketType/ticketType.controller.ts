import { Response, Request, NextFunction } from "express";
import TicketTypeService from "./ticketType.service";
import { validateTicketType as validate } from "./ticketType.validation";

const ticketTypeServices = new TicketTypeService();

// Create a ticket type
export default class TicketTypeController {
  public createTicketType = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { error, value } = validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      const data = await ticketTypeServices.createTicketType(value);

      if (data.error) {
        return res.status(401).json({
          success: false,
          message: data.msg
        });
      }

      const {
        ticketTypeId,
        eventId,
        numberOfTicketsAvailable,
        price,
        ticketType
      } = data.ticketType;
      const ticketTypeDetails = {
        ticketTypeId,
        eventId,
        numberOfTicketsAvailable,
        price,
        ticketType
      };
      return res.status(201).json({
        success: true,
        message: `${ticketType} ticket Successfully created`,
        data: ticketTypeDetails,
        status: 201
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.toString(),
        status: 500
      });
      next(error);
    }
  };
}
