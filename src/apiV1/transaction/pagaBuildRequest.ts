import PagaBusinessClient from "paga-business";
import dotenv from "dotenv";

dotenv.config();
// console.log(dotenv.config());
// console.log(process.env);
export default class PagaBusiness {
  public pagaBusinessClient = PagaBusinessClient.Builder()
    .setPrincipal(process.env.PRINCIPAL)
    .setCredential(process.env.CREDENTIALS)
    .setApiKey(process.env.APIKEY)
    .setIsTest(true)
    .build();
}
