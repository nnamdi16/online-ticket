import { Router } from "express";
import TransactionController from "./transaction.controller";
const router: Router = Router();

const transaction = new TransactionController();

const { getMobileOperators, moneyTransfer } = transaction;
router.post("/", getMobileOperators);
router.post("/moneyTransfer", moneyTransfer);
export default router;
