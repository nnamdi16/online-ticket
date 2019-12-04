import { Router } from "express";
// import auth from './auth/auth.route';
import users from "./users/user.route";
import event from "./event/event.route";

const router: Router = Router();

// router.use('/', auth);
router.use("/users", users);
router.use("/events", event);

export default router;
