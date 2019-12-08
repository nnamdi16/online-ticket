import { Router, Response, Request, NextFunction } from "express";
// import verifyToken from '../../helpers/verifyToken';
import EventService from "./event.service";
import { validateEvent as validate } from "./event.validation";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { object } from "@hapi/joi";
import { EventSchema } from "./event.model";
const event: Router = Router();
const controller = new EventService();

/**
 * Create an Event
 */


export default class EventController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
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
      const data = await controller.createEvent(value);
      if (data.error) {
        res.status(201).json({
          success: false,
          message: data.msg
        });
        next(error);
        return;
      }
      const eventData = await data.event;
      return res.status(201).json({
        success: true,
        message: "Successfully created event",
        data: eventData,
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
  };

  /**
   * Get all events
   */

  public getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await controller.getAllEvent((err, data) => {
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
  };

  /**
   * Get single event by Id
   */

  public getOneEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      await controller.getOneEventById(id, (err, data) => {
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
  };

  /**
   * Update event
   */
  // event.put("/:id",

  public updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      await controller.updateEvent(
        id,
        req.body.title,
        req.body.description,
        req.body.location,
        req.body.category,
        req.body.startDate,
        req.body.endDate,
        req.body.time,
        req.body.noOfAttendees,
        req.body.eventUrl,
        req.body.imageUrl,
        req.body.authorId,
        req.body.status,

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
  };

  // event.delete(
  //   "/:id",

  public deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const eventId = req.params.id;
    try {
      await controller.deleteEvent(eventId, (err, data: EventSchema) => {
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
  };
}
