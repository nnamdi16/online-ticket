import { Router, Response, Request, NextFunction } from "express";
// import verifyToken from '../../helpers/verifyToken';
import TicketController from "./ticket.controller";
import { validateEvent as validate } from "./ticket.validation";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { object } from "@hapi/joi";
import { TicketSchema } from "./ticket.model";
const event: Router = Router();
const controller = new TicketController();

/**
 * Create an Event
 */

event.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        next(error);
        return;
      }
      const data = await controller.createTicket(value);
      if (data.error) {
        res.status(201).json({
          success: false,
          message: data.msg
        });
        next(error);
        return;
      }
      const ticketData = await data.ticket;
      return res.status(201).json({
        success: true,
        message: "Successfully created ticket",
        data: ticketData,
        status: 201
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        status: 500
      });
      next(error);
      return;
    }
  }
);

/**
 * Get all events
 */
event.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller.getAllTickets((err, data) => {
      if (err) {
        res.status(400).json({
          success: false,
          error: err.message
        });
        next(err);
        return;
      }
      return res.status(200).json({
        success: true,
        message: data
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      status: 500
    });
    next(error);
    return;
  }
});

/**
 * Get single event by Id
 */

event.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    await controller.getOneTicketById(id, (err, data) => {
      if (err) {
        res.status(404).json({
          success: false,
          error: err.message
        });
        next(err);
        return;
      }
      return res.status(200).json({
        success: true,
        message: data
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      status: 500
    });
    next(error);
    return;
  }
});

/**
 * Update event
 */
event.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    await controller.updateTicket(
      id,
      req.body.amount,

      (err, data) => {
        if (err) {
          res.status(400).json({
            success: false,
            error: err.message,
            status: 400
          });
          next(err);
          return;
        }
        return res.status(200).json({
          success: true,
          message: data,
          status: 200
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      status: 500
    });
    next(error);
    return;
  }
});

event.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const ticketId = req.params.id;
    try {
      await controller.deleteTicket(ticketId, (err, data: TicketSchema) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: err.message
          });
        }
        return res.status(200).json({
          status: ` Successfully deleted`
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
      return next(error);
    }
  }
);

export default event;
