// import * as bcrypt from "bcrypt";
// import { Request, Response } from "express";
// import * as jwt from "jwt-then";
// import config from "../../config/config";
import User, { UserSchema } from "./user.model";
import OnlineTicketWallet, {
  OnlineTicketWalletSchema
} from "../onlineTicketWallet/onlineTicketWallet.model";
import { UserType } from "./user.typings";
import jwt from "jsonwebtoken";

export default class UserService {
  public register = async (data: UserSchema): Promise<any> => {
    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      deleted: data.deleted,
      isPlanner: data.isPlanner
    });

    // const onlineTicketWallet = new OnlineTicketWallet({
    //   userId: data.userId
    // });

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

      const { isPlanner } = user;
      if (isPlanner) {
        const onlineTicketWallet = new OnlineTicketWallet({
          userId: user.userId
        });
        await onlineTicketWallet.save();
      }

      return {
        error: false,
        user
        // ticketWallet
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  public authenticate = async (data: UserSchema): Promise<any> => {
    const newUser = new User();
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return {
        error: true,
        msg: "Invalid Email or Password"
      };
    }
    const { password, salt } = user;
    const matchedPassword = await newUser.comparePassword(
      data.password,
      salt,
      password
    );

    if (!matchedPassword) {
      return {
        error: true,
        msg: "Invalid Credentials. Please check your email and password"
      };
    }

    return {
      error: false,
      user
    };
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
