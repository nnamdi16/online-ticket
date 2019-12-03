import { Router, Response, Request, NextFunction } from "express";
// import verifyToken from '../../helpers/verifyToken';
import UserController from "./user.controller";
import { validateUser as validate } from "./user.validation";
import jwt from "jsonwebtoken";
import config from "../../config/config";
const users: Router = Router();

const controller = new UserController();

// Create a user
users.post(
  "/signUp",
  async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });    
      }
      const data = await controller.register(value);

      if (data.error) {
        res.status(401).json({
          success: false,
          message: data.msg
        });
        return;
      }

      const { userId, firstName, lastName, username, email } = data.user;
      const { token } = data.user;
      const userDetails = { userId, firstName, lastName, username, email };
      return res.status(201).json({
        success: true,
        message: `${username} Successfully created`,
        data: userDetails,
        status: 201,
        token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.toString()
      });
      next(error);
    }
  }
);

users.post(
  "/signIn",
  async (req: Request | any, res: Response | any, next: NextFunction) => {
    try {
      const { error, value } = validate(req.body);
      console.log(value);
      if (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        return;
      }

      const data = await controller.authenticate(value);

      // console.log(data);
      const { userId, email } = data.user;
      // req.session.user = { id: userId, email };
      if (data.error) {
        res.status(401).json({
          message: data.msg
        });
        return;
      }

      const token = await jwt.sign({ email }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION
      });

      // Valid login

      res.status(200).json({
        id: userId,
        email,
        // sessionID: req.sessionID,
        data: token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
      next(error);
    }
  }
);

// // Retrieve all Users
// user.get('/', controller.findAll);

// // Retrieve a Specific User
// user.get('/:id', verifyToken, controller.findOne);

// // Update a User with Id
// user.put('/:id', controller.update);

// // Delete a User with Id
// user.delete('/:id', controller.remove);

export default users;
