import { Router } from "express";
import UserController from "./user.controller";

const router: Router = Router();

const user = new UserController();

const { register, login } = user;
router.post("/register", register);
router.post("/login", login);

export default router;
