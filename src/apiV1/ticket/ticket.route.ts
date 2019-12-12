import { Router } from "express";
import TicketController from "./ticket.controller";
const router: Router = Router();

const ticket = new TicketController();
const {
  createTicket,
  getAllTickets,
  getOneTicketById,
  updateTicket,
  deleteTicket
} = ticket;

router.post("/generate", createTicket);

router.get("/", getAllTickets);
router.get("/:id", getOneTicketById);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;
