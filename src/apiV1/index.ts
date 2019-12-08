import { Router } from "express";
// import auth from './auth/auth.route';
import users from "./users/user.route";
import event from "./event/event.route";
import ticketType from "./ticketType/ticketType.route";
import transaction from "./transaction/transaction.route";
const router: Router = Router();

// router.use('/', auth);
router.use("/users", users);
router.use("/events", event);
router.use("/ticketType", ticketType);
router.use("/pay", transaction);

export default router;
