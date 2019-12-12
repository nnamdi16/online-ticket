import { Router } from "express";
import EventController from "./event.controller";
const router: Router = Router();

const event = new EventController();
const {
  getAllEvents,
  getOneEventById,
  updateEvent,
  deleteEvent,
  register
} = event;

router.get("/", getAllEvents);
router.get("/:id", getOneEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/register", register);

export default router;
