import { Client, Databases ,Query} from "appwrite";

const client = new Client();
const DB_ID = "676ec63a00199012ab5d";
const COLLECTION_ID = "677f49c50014570c084c";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("676e59c6000b84885e72");

export const database = new Databases(client);

export { client, DB_ID, COLLECTION_ID,Query };
