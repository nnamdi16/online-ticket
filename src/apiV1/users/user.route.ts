import { Router, Response, Request, NextFunction } from "express";
// import verifyToken from '../../helpers/verifyToken';
import Controller from "./user.controller";
import { validateUser as validate } from "./user.validation";

const users: Router = Router();

const controller = new Controller();

// Create a user
users.post(
  "/signUp",
  async (req: Request | any, res: Response, next: NextFunction) => {
    console.log("We are here");
    try {
      const { error, value } = validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      const data = await controller.createUser(value);
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
      // next(error);
      res.status(500).json({
        success: false,
        message: error.toString()
      });
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
