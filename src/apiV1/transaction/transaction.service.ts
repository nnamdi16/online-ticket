import Transaction, { TransactionSchema } from "./transaction.model";
import Ticket, { TicketSchema } from "../ticket/ticket.model";
import OnlineTicketWallet, {
  OnlineTicketWalletSchema
} from "../onlineTicketWallet/onlineTicketWallet.model";
// import pagaBusinessClient = require("paga-business");
import PagaBusiness from "./pagaBuildRequest";
// import pagaBusinessClient = require("../../../node_modules/paga-business/PagaBusinessClient.js");
export default class TransactionService {
  public transactionSetup = async (data: any):Promise<any> => {
    try {
      const transaction =  await PagaBusiness.airtimePurchase()
    } catch (error) {}
  };
  public initiateTransaction = async (
    data: TransactionSchema
  ): Promise<any> => {
    const newTransaction = new Transaction({
      eventId: data.eventId,
      amount: data.amount,
      userId: data.userId,
      transactionRef: data.transactionRef,
      onlineTicketWalletId: data.onlineTicketWalletId
    });

    try {
      const getWalletBalance = await OnlineTicketWallet.findOne({
        onlineTicketWalletId: data.onlineTicketWalletId
      });
      console.log(getWalletBalance);
    } catch (error) {
      throw new Error(error);
    }
  };
}
