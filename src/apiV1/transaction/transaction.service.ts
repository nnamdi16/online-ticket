import Transaction from "./transaction.model";
import Ticket from "../ticket/ticket.model";
import TicketType, { TicketTypeSchema } from "../ticketType/ticketType.model";
import UtilLibrary from "./transaction.util";
import OnlineTicketWallet from "../onlineTicketWallet/onlineTicketWallet.model";
import PagaBusiness from "./pagaBuildRequest";
import { any } from "joi";

export default class TransactionService {
  private pagaBusinessClient = new PagaBusiness();
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
      holdingPeriod,
      transactionType
    } = param;

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
      const getEventId = await TicketType.findOne({
        _id: ticketTypeId
      });
      console.log(`Get Event ${getEventId}`);

      // Destructuring getEventById
      const eventId = getEventId?.eventId;
      const eventPrice: any = getEventId?.price;

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
      const transferFunds = await this.pagaBusinessClient.pagaBusinessClient.moneyTransfer(
        ...userDetails
      );

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
      const balance: any = solve?.amount;
      const util = new UtilLibrary();
      const clientReturns = util.clientReturns(balance, eventPrice);
      console.log(clientReturns);

      const updateEventPlannerTicket = await OnlineTicketWallet.findOneAndUpdate(
        { userId },
        { $set: { amount: clientReturns, pagaReferenceKey: transactionId } },
        { new: true }
      );

      console.log(updateEventPlannerTicket);
      const onlineTicketWalletId = updateEventPlannerTicket?._id;
      // console.log(`Our transaction is here ${transactionId}`);
      // if (transactionId === null) {
      //   return {
      //     error: true,
      //     data: message
      //   };
      // }
      const newTransaction = new Transaction({
        eventId,
        ticketId,
        amount: balance,
        userId,
        transactionRef: transactionId,
        status: message,
        onlineTicketWalletId,
        transactionType,
        phoneNumber: destinationAccount
      });

      const transaction = await newTransaction.save();
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
        statusText: "Successfully Registered for the event ",
        transaction
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

  public payEventCreators = async (param: any): Promise<any> => {
    // Define parameters for request body
    const {
      onlineTicketWalletId,
      amount,
      currency,
      bankName,
      destinationAccountNumber,
      recipientPhoneNumber,
      UserMobileOperator,
      alternateSenderName
      // remarks,
    } = param;
    const locale = "NG";
    const suppressRecipientMessage = false;
    const remarks = `Withdrawal of ${amount}`;
    const util = new UtilLibrary();

    const getBankReferenceNumber = util.createReferenceNumber();
    const mobileOperatorReferenceNumber = util.createReferenceNumber();

    try {
      const loadCustomerDetails = await OnlineTicketWallet.findOne({
        _id: onlineTicketWalletId
        // amount: { $gte: amount }
      }).populate("users");

      if (!loadCustomerDetails) {
        return {
          err: true,
          message: "Account does not exist"
        };
      }

      console.log(loadCustomerDetails);
      const recipientName = `${loadCustomerDetails.users[0].firstName} ${loadCustomerDetails.users[0].lastName} `;
      const recipientEmail = loadCustomerDetails.users[0].Email;
      const bankParam = [getBankReferenceNumber, locale];

      const getBankDetails = await this.pagaBusinessClient.pagaBusinessClient.getBanks(
        ...bankParam
      );
      const { banks } = getBankDetails.data;
      console.log(banks);

      let destinationBankUUID;
      for (const [index, element] of banks.entries()) {
        if (banks[index].name === bankName) {
          destinationBankUUID = banks[index].uuid;
        }
      }
      console.log(`We are here ${destinationBankUUID}`);
      // const depositToBank = await pagaBusinessClient.pagaBusinessClient.depositToBank();
      console.log(loadCustomerDetails);
      const { userId, amount: walletBalance } = loadCustomerDetails;

      const mobileOperatorParam = [mobileOperatorReferenceNumber, locale];
      const mobileOperatorList = await this.pagaBusinessClient.pagaBusinessClient.getMobileOperators(
        ...mobileOperatorParam
      );
      console.log(mobileOperatorList);
      const { mobileOperator } = mobileOperatorList.data;

      console.log(mobileOperator);

      let recipientMobileOperatorCode;
      for (const [index, element] of mobileOperator.entries()) {
        console.log(mobileOperator[index].name);
        if (mobileOperator[index].name === UserMobileOperator) {
          recipientMobileOperatorCode =
            mobileOperator[index].mobileOperatorCode;
        }
      }
      console.log(recipientMobileOperatorCode);
      const depositToBankDetails = [
        getBankReferenceNumber,
        amount,
        currency,
        destinationBankUUID,
        destinationAccountNumber,
        recipientPhoneNumber,
        recipientMobileOperatorCode,
        recipientEmail,
        recipientName,
        alternateSenderName,
        suppressRecipientMessage,
        remarks,
        locale
      ];

      if (walletBalance < amount) {
        return {
          error: true,
          message: "Insufficient Balance"
        };
      }
      const payMerchant = await this.pagaBusinessClient.pagaBusinessClient.depositToBank(
        ...depositToBankDetails
      );
      console.log(payMerchant);
      const {
        data: { transactionId }
      } = payMerchant;
      if (transactionId === null) {
        return {
          error: true,
          message: "Transaction unsuccessful"
        };
      }

      // console.log(payMerchant);
      // const response = {
      //   referenceNumber,
      //   merchantTransactionReference: "",
      //   message: "Airtime purchase request made successfully",
      //   responseCode: 0,
      //   transactionId: "At34",
      //   fee: 50.0,
      //   currency: null,
      //   exchangeRate: null
      // };

      const merchantBalance = walletBalance - amount;
      const transaction = new Transaction({
        userId,
        transactionRef: transactionId,
        status: "APPROVED",
        transactionType: "FUNDS WITHDRAWAL",
        amount,
        phoneNumber: recipientPhoneNumber
      });
      await transaction.save();
      console.log(onlineTicketWalletId);
      const updateMerchantWallet = await OnlineTicketWallet.findOneAndUpdate(
        {
          _id: onlineTicketWalletId
        },
        { $set: { amount: merchantBalance } },
        { new: true }
      );
      console.log(updateMerchantWallet);
      return {
        error: false,
        message: "Successfully paid merchants",
        data: transaction
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  public loyaltyGift = async (param: any): Promise<any> => {
    // parameters for req.body
    const {
      eventId,
      ticketId,
      amount: price,
      currency,
      purchaserPrincipal,
      purchaserCredentials,
      locale,
      transactionType
    } = param;

    try {
      const validTicket = await Transaction.findOne({
        ticketId,
        eventId
      });
      if (!validTicket) {
        return {
          err: true,
          message: "Invalid Ticket"
        };
      }

      console.log(validTicket);
      const {
        phoneNumber,
        userId,
        ticketId: referenceNumber,
        eventId: sourceOfFunds
      } = validTicket;

      const userDetails = [
        referenceNumber,
        price,
        currency,
        phoneNumber,
        purchaserPrincipal,
        purchaserCredentials,
        sourceOfFunds,
        locale
      ];

      console.log(userDetails[userDetails.length - 2]);
      const sendLoyaltyGift = await this.pagaBusinessClient.pagaBusinessClient.airtimePurchase(
        ...userDetails
      );
      // const { transactionId } = sendLoyaltyGift;
      console.log(sendLoyaltyGift.data);
      const { transactionId } = sendLoyaltyGift.data;
      if (transactionId == null) {
        return {
          error: true,
          statusText: "Transaction Unsuccessful",
          message: sendLoyaltyGift.data.message
        };
      }
      // const response = {
      //   referenceNumber: "+251911314250",
      //   message: "Airtime purchase request made successfully",
      //   responseCode: 0,
      //   transactionId: "At34",
      //   fee: 50.0,
      //   currency: null,
      //   exchangeRate: null
      // };

      const transaction = new Transaction({
        ticketId,
        amount: price,
        userId,
        transactionRef: transactionId,
        status: "APPROVED",
        transactionType,
        phoneNumber
      });
      const loyaltyTransaction = await transaction.save();
      console.log(loyaltyTransaction);

      return {
        error: false,
        // msg: message,
        statusText: "Successfully received bonus airtime ",
        transaction
        // data
      };
    } catch (error) {
      throw new Error(error);
    }
  };
}
