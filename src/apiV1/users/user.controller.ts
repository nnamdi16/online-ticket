// import * as bcrypt from "bcrypt";
// import { Request, Response } from "express";
// import * as jwt from "jwt-then";
// import config from "../../config/config";
import User, { UserSchema } from "./user.model";

export default class UserController {
  public createUser = async (data: UserSchema) => {
    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
      isSuper: data.isSuper,
      deleted: data.deleted
    });

    try {
      const validUser = await User.exists({
        email: data.email
      });
      if (validUser) {
        return {
          error: true,
          msg: "User email already exist"
        };
      }
      newUser.setPassword(data.password);
      newUser.generateJWT();
      const user = await newUser.save();
      return {
        error: false,
        user
      };
    } catch (error) {
      throw new Error(error);
    }
  };
}

// export default class UserController {

//   public findAll = async (req: Request, res: Response): Promise<any> => {
//     try {
//       const users = await User.find();
//       if (!users) {
//         return res.status(404).send({
//           success: false,
//           message: 'Users not found',
//           data: null
//         });
//       }

//       res.status(200).send({
//         success: true,
//         data: users
//       });
//     } catch (err) {
//       res.status(500).send({
//         success: false,
//         message: err.toString(),
//         data: null
//       });
//     }
//   };

//   public findOne = async (req: Request, res: Response): Promise<any> => {
//     try {
//       const user = await User.findById(req.params.id, { password: 0 });
//       if (!user) {
//         return res.status(404).send({
//           success: false,
//           message: 'User not found',
//           data: null
//         });
//       }

//       res.status(200).send({
//         success: true,
//         data: user
//       });
//     } catch (err) {
//       res.status(500).send({
//         success: false,
//         message: err.toString(),
//         data: null
//       });
//     }
//   };

//   public update = async (req: Request, res: Response): Promise<any> => {
//     const { name, lastName, email, password } = req.body;
//     try {
//       const userUpdated = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: {
//             name,
//             lastName,
//             email,
//             password
//           }
//         },
//         { new: true }
//       );
//       if (!userUpdated) {
//         return res.status(404).send({
//           success: false,
//           message: 'User not found',
//           data: null
//         });
//       }
//       res.status(200).send({
//         success: true,
//         data: userUpdated
//       });
//     } catch (err) {
//       res.status(500).send({
//         success: false,
//         message: err.toString(),
//         data: null
//       });
//     }
//   };

//   public remove = async (req: Request, res: Response): Promise<any> => {
//     try {
//       const user = await User.findByIdAndRemove(req.params.id);

//       if (!user) {
//         return res.status(404).send({
//           success: false,
//           message: 'User not found',
//           data: null
//         });
//       }
//       res.status(204).send();
//     } catch (err) {
//       res.status(500).send({
//         success: false,
//         message: err.toString(),
//         data: null
//       });
//     }
//   };
// }
