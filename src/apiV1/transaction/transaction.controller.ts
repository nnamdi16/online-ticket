import { Response, Request, NextFunction } from "express";
import TransactionService from "../transaction/transaction.service";
import { validateTransaction as validate } from "../transaction/transaction.validation";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const service = new TransactionService();

export default class TransactionController {
  public moneyTransfer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await service.initiateTransaction(req.body);
      return res.status(201).json({
        success: true,
        message: "Transaction completed",
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
      return next(error);
    }
  };

  public getMobileOperators = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await service.getMobileOperators(req.body);
      return res.status(201).json({
        success: true,
        message: "Transaction completed",
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
      return next(error);
    }
  };
}
