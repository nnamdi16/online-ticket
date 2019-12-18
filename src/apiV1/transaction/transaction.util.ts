import PagaBusiness from "./pagaBuildRequest";
import uuid4 from "uuid/v4";
export default class UtilLibrary {
  public getMobileOperators = async (obj: any): Promise<any> => {
    const pagaBusinessClient = new PagaBusiness();
    try {
      const { locale } = obj;
      const referenceNumber = this.createReferenceNumber();
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

  public clientReturns = (balance: number, amount: number) => {
    return amount - amount * 0.15 + balance;
  };

  public companyFee = (amount: number) => {
    return amount * 0.15;
  };
  public createReferenceNumber = () => {
    return uuid4();
  };

  public DepositToBank = async (param: any): Promise<any> => {
    const {
      referenceNumber,
      amount,
      currency,
      destinationBankUUID,
      destinationAccountNumber,
      recipientPhoneNumber,
      recipientMobileOperatorCode,
      recipientEmail,
      recipientName,
      suppressRecipientMessage,
      remarks,
      locale
    } = param;

    const transactionDetails = [
      referenceNumber,
      amount,
      currency,
      destinationBankUUID,
      destinationAccountNumber,
      recipientPhoneNumber,
      recipientMobileOperatorCode,
      recipientEmail,
      recipientName,
      suppressRecipientMessage,
      remarks,
      locale
    ];
    try {
      const pagaBusinessClient = new PagaBusiness();
      const depositToBank = await pagaBusinessClient.pagaBusinessClient.depositToBank(
        ...transactionDetails
      );
      return depositToBank;
    } catch (error) {
      throw new Error(error);
    }
  };
  public moneyTransfer = async (param: any): Promise<any> => {
    try {
      const pagaBusinessClient = new PagaBusiness();
      const depositToBank = await pagaBusinessClient.pagaBusinessClient.depositToBank(
        param
      );
      return depositToBank;
    } catch (error) {
      throw new Error(error);
    }
  };

  public validateDepositToBank = async (param: any) => {
    const {
      referenceNumber,
      amount,
      currency,
      destinationBankUUID,
      destinationBankAccountNumber,
      recipientPhoneNumber,
      recipientMobileOperatorCode,
      recipientEmail,
      recipientName,
      locale
    } = param;

    const transactionDetails = [
      referenceNumber,
      amount,
      currency,
      destinationBankUUID,
      destinationBankAccountNumber,
      recipientPhoneNumber,
      recipientMobileOperatorCode,
      recipientEmail,
      recipientName,
      locale
    ];
    try {
      const pagaBusinessClient = new PagaBusiness();
      const validateDepositToBank = await pagaBusinessClient.pagaBusinessClient.validateDepositToBank(
        ...transactionDetails
      );
      return validateDepositToBank;
    } catch (error) {
      throw new Error(error);
    }
  };

  public checkAccountBalance = async (param: any) => {
    const {
      referenceNumber,
      accountPrincipal,
      accountCredentials,
      sourceOfFunds,
      locale
    } = param;

    const transactionDetails = [
      referenceNumber,
      accountPrincipal,
      accountCredentials,
      sourceOfFunds,
      locale
    ];
    try {
      const pagaBusinessClient = new PagaBusiness();
      const checkAccountBalance = await pagaBusinessClient.pagaBusinessClient.accountBalance(
        ...transactionDetails
      );
      return checkAccountBalance;
    } catch (error) {
      throw new Error(error);
    }
  };

  public transactionHistory = async (param: any) => {
    const {
      referenceNumber,
      accountPrincipal,
      accountCredentials,
      startDateUTC,
      endDateUTC,
      locale
    } = param;

    const transactionDetails = [
      referenceNumber,
      accountPrincipal,
      accountCredentials,
      startDateUTC,
      endDateUTC,
      locale
    ];
    try {
      const pagaBusinessClient = new PagaBusiness();
      const checkAccountBalance = await pagaBusinessClient.pagaBusinessClient.transactionHistory(
        ...transactionDetails
      );
      return checkAccountBalance;
    } catch (error) {
      throw new Error(error);
    }
  };

  public recentTransactionHistory = async (param: any) => {
    const {
      referenceNumber,
      accountPrincipal,
      accountCredentials,
      locale
    } = param;

    const transactionDetails = [
      referenceNumber,
      accountPrincipal,
      accountCredentials,
      locale
    ];
    try {
      const pagaBusinessClient = new PagaBusiness();
      const checkAccountBalance = await pagaBusinessClient.pagaBusinessClient.recentTransactionHistory(
        ...transactionDetails
      );
      return checkAccountBalance;
    } catch (error) {
      throw new Error(error);
    }
  };

  public getBanks = async (param: any) => {
    const { referenceNumber, locale } = param;

    const transactionDetails = [referenceNumber, locale];
    try {
      const pagaBusinessClient = new PagaBusiness();
      const checkBanksDetails = await pagaBusinessClient.pagaBusinessClient.getBanks(
        ...transactionDetails
      );
      return checkBanksDetails;
    } catch (error) {
      throw new Error(error);
    }
  };
}
