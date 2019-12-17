import { Router } from "express";
import TransactionController from "./transaction.controller";
const router: Router = Router();

const transaction = new TransactionController();

const {
  getMobileOperators,
  moneyTransfer,
  merchantPayment,
  loyaltyGift
} = transaction;
router.post("/", getMobileOperators);
router.post("/moneyTransfer", moneyTransfer);
router.post("/merchantPayment", merchantPayment);
router.post("/loyaltyGift", loyaltyGift);
export default router;
