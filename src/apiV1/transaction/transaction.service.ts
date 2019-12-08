import Transaction, { TransactionSchema } from "./transaction.model";
import Ticket, { TicketSchema } from "../ticket/ticket.model";
import OnlineTicketWallet, {
  OnlineTicketWalletSchema
} from "../onlineTicketWallet/onlineTicketWallet.model";

import PagaBusiness from "./pagaBuildRequest";

export default class TransactionService {
  public getMobileOperators = async (obj: any): Promise<any> => {
    const pagaBusinessClient = new PagaBusiness();
    try {
      const { referenceNumber, locale } = obj;
      const parameters: string[] = [referenceNumber, locale];
      const mobileOperators = await pagaBusinessClient.pagaBusinessClient.getMobileOperators(
        ...parameters
      );
      const { data } = mobileOperators;
      return {
        error: false,
        data
      };
    } catch (error) {
      return {
        error: true,
        data: error.message
      };
    }
  };

  public initiateTransaction = async (data: any): Promise<any> => {
    const pagaBusinessClient = new PagaBusiness();
    const {
      // eventId,
      // amount,
      // userId,
      // ticketId,
      // transactionRef,
      referenceNumber,
      amount,
      currency,
      destinationAccount,
      destinationBank,
      withdrawalCode,
      sourceOfFunds,
      transferReference,
      senderPrincipal,
      senderCredentials,
      suppressRecipientMsg,
      locale,
      alternateSenderName,
      minRecipientKYCLevel,
      holdingPeriod
    } = data;
    // const newTransaction = new Transaction({
    //   eventId,
    //   amount,
    //   userId,
    //   ticketId,
    //   transactionRef
    // });

    try {
      // const {
      //   referenceNumber,
      //   currency,
      //   destinationAccount,
      //   destinationBank,
      //   senderPrincipal,
      //   senderCredentials,
      //   withdrawalCode,
      //   sourceOfFunds,
      //   transferReference,
      //   suppressRecipientMsg,
      //   locale,
      //   alternateSenderName,
      //   minRecipientKYCLevel,
      //   holdingPeriod
      // } =

      // const userDetails = [
      //   referenceNumber,
      //   amount,
      //   currency,
      //   destinationAccount,
      //   destinationBank,
      //   withdrawalCode,
      //   sourceOfFunds,
      //   transferReference,
      //   suppressRecipientMsg,
      //   locale,
      //   alternateSenderName,
      //   minRecipientKYCLevel,
      //   holdingPeriod
      // ];
      const transferFunds = await pagaBusinessClient.pagaBusinessClient.moneyTransfer(
        referenceNumber,
        amount,
        currency,
        destinationAccount,
        destinationBank,
        senderPrincipal,
        senderCredentials,
        withdrawalCode,
        sourceOfFunds,
        transferReference,
        suppressRecipientMsg,
        locale,
        alternateSenderName,
        minRecipientKYCLevel,
        holdingPeriod
      );

      console.log(transferFunds);
      console.log("Grow boy");

      return {
        error: false,
        data: transferFunds.data
      };

      // const getWalletBalance = await OnlineTicketWallet.findOne({
      //   onlineTicketWalletId: data.onlineTicketWalletId
      // });
      // console.log(getWalletBalance);
    } catch (error) {
      throw new Error(error);
    }
  };
}
