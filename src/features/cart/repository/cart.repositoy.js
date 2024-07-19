import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../middlewares/errorHandling.middleware.js";

export default class CartRepository {
  // Get user's cart
  async getItems(userId) {
    try {
      let collection = await getDB().collection("UserCart");
      return await collection.find({ userId: new ObjectId(userId) }).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError(500, "Error found! Please try again later.");
    }
  }

  // Add to cart
  async add(usersProduct) {
    try {
      let collection = await getDB().collection("UserCart");
      return await collection.updateOne(
        {
          userId: new ObjectId(usersProduct.userId),
          productId: new ObjectId(usersProduct.productId),
        },

        { $inc: { quantity: usersProduct.quantity } },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError(500, "Error found! Please try again later.");
    }
  }
  //delete from cart
  async delete(userID, productID) {
    try {
      let collection = await getDB().collection("UserCart");
      let result = await collection.deleteOne({
        userId: new ObjectId(userID),
        productId: new ObjectId(productID),
      });
      return result.deletedCount > 0;
    } catch (err) {
      throw new ApplicationError(500, "Error found! Please try again later.");
    }
  }
}
