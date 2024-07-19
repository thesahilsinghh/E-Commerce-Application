import { MongoClient } from "mongodb";

let clientInstance;
export const connectToMongoDB = async () => {
  await MongoClient.connect(process.env.DB_URL)
    .then((client) => {
      clientInstance = client;
      console.log("Connection Established!");
    })
    .catch((err) => console.log(err));
};
export const getDB = () => {
  return clientInstance.db();
};
