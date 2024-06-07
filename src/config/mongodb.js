import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecommerce-db";
let clientInstance;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((client) => {
      clientInstance = client;
      console.log("Connection Established!");
    })
    .catch((err) => console.log(err));
};
export const getDB = () => {
  return clientInstance.db();
};
