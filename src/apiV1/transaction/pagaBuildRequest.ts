const PagaBusinessClient = require("paga-business");
import dotenv from "dotenv";
dotenv.config();

export default class PagaBusiness {
  static airtimePurchase() {
    throw new Error("Method not implemented.");
  }
  public pagaBusinessClient = PagaBusinessClient.Builder()
    .setPrincipal(process.env.PRINCIPAL)
    .setCredential(process.env.CREDENTIALS)
    .setApiKey(process.env.APIKEY)
    .setIsTest(true)
    .build();
}
