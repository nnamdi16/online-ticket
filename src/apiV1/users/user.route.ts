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
      console.log(error, value);
      if (error) {
        return res.status(400).json({
          message: error.message
        });
      }
      const data = await controller.createUser(value);
      if (data.error) {
        res.status(401).json({
          message: data.msg
        });
        return;
      }
      const { _id, firstName, lastName, username, email } = data.user;
      res.status(200).json({ _id, firstName, lastName, username, email });
      return res.json;
    } catch (error) {
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
