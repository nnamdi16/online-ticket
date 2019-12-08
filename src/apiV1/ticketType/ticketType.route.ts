import { Router } from "express";
import TicketTypeController from "./ticketType.controller";
const router: Router = Router();
const ticketType = new TicketTypeController();

router.post("/", ticketType.createTicketType);

export default router;
