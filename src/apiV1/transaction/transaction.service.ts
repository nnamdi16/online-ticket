import Transaction, { TransactionSchema } from "./transaction.model";
import Ticket, { TicketSchema } from "../ticket/ticket.model";
import TicketType from "../ticketType/ticketType.model";
import { clientFee, companyFee } from "./transaction.util";
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

  public initiateTransaction = async (param: any): Promise<any> => {
    // Define parameter for instantiating transaction
    const {
      ticketId,
      currency,
      destinationAccount,
      destinationBank,
      withdrawalCode,
      sourceOfFunds,
      senderPrincipal,
      senderCredentials,
      suppressRecipientMsg,
      locale,
      alternateSenderName,
      minRecipientKYCLevel,
      holdingPeriod
    } = param;

    const pagaBusinessClient = new PagaBusiness();
    try {
      const getTicket = await Ticket.findOne({ _id: ticketId });
      console.log(`Stop Freaking out ${getTicket}`);
      if (getTicket === null) {
        throw new Error("Ticket does not Exist");
      }

      // Destructuring ticketTypes variables
      const {
        price: amount,
        _id: referenceNumber,
        _id: transferReference,
        userId,
        ticketTypeId
      } = getTicket;
      const getEventId = await TicketType.findOne({ _id: ticketTypeId });
      console.log(`Get Event ${getEventId}`);

      // Destructuring getEventById
      const {
        _id,
        eventId,
        ticketType,
        numberOfTicketsAvailable,
        price
      } = getEventId;

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

      const userDetails = [
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
      ];

      // Make payments for the event by transferring money from client paga account to app's paga account
      const transferFunds = await pagaBusinessClient.pagaBusinessClient.moneyTransfer(
        ...userDetails
      );
      // console.log("Stop the work");
      // console.log(Object.keys(transferFunds));

      // Destructuring response from money transfer
      const {
        data: { transactionId, message, responseCode },
        data
      } = transferFunds;

      if (data === undefined) {
        const {
          exception: {
            response: {
              data: { errorMessage, responseCode: errorResponseCode }
            }
          }
        } = transferFunds;
        return {
          error: true,
          msg: errorMessage,
          status: errorResponseCode
        };
      }
      console.log(data);
      // console.log(data, errorMessage, responseCode);

      if (transactionId == null) {
        return {
          error: true,
          msg: message,
          statusText: "Transaction Unsuccessful",
          status: responseCode
        };
      }
      console.log("Start the work");
      console.log(userId);
      const solve = await OnlineTicketWallet.findOne({ userId });
      console.log(`we've solved the bug ${solve}`);
      console.log(`This is the userId ${userId}`);

      const updateEventPlannerTicket = await OnlineTicketWallet.findOneAndUpdate(
        { userId },
        { $set: { amount: price, pagaReferenceKey: transactionId } },
        { new: true }
      );

      console.log(updateEventPlannerTicket);
      // console.log(`Our transaction is here ${transactionId}`);
      // if (transactionId === null) {
      //   return {
      //     error: true,
      //     data: message
      //   };
      // }

      // Updates client OnlineWalletAccount
      // const updateOnlineTicketWallet = OnlineTicketWallet.findOneAndUpdate(
      //   { _id: userId },
      //   { $set: { amount } },
      //   { new: true },
      //   (err, doc) => {
      //     if (err) {
      //       console.log(err.message);
      //     }
      //     console.log(`Working update ${doc}`);
      //   }
      // );
      // console.log(`the find ${Object.keys(updateOnlineTicketWallet)}`);

      // const newTransaction = new Transaction({
      //   eventId,
      //   ticketId,
      //   amount,
      //   userId,
      //   transactionRef: transactionId
      // });
      // const transaction = newTransaction.save();
      return {
        error: false,
        msg: message,
        statusText: "Successfully Registered for the event "
        // data
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
