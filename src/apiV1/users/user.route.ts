import { Router } from "express";
import UserController from "./user.controller";

const router: Router = Router();

const user = new UserController();

router.post("/register", user.register);
router.post("/login", user.login);

export default router;
