import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../middlewares/errorHandling.middleware.js";

export default class ProductRepository {
  async add(product) {
    try {
      let db = await getDB();
      let collection = await db.collection("products");
      await collection.insertOne(product);
      return product;
    } catch (err) {
      throw new ApplicationError(
        500,
        "Error in database connection! please try again later."
      );
    }
  }
  async getAll() {
    let db = await getDB();
    let collection = await db.collection("products");
    let products = await collection.find().toArray();
    return products;
  }
  catch(err) {
    console.log(err + "SD");
    throw new ApplicationError(
      500,
      "Error in database connection! please try again later."
    );
  }

  async get(productID) {
    let db = await getDB();
    let collection = await db.collection("products");
    return await collection.findOne({ _id: new ObjectId(productID) });
  }
  catch(err) {
    throw new ApplicationError(
      500,
      "Error in database connection! please try again later."
    );
  }

  async filter(minPrice, maxPrice) {
    let db = await getDB();
    let collection = await db.collection("products");
    let filterExpression = {};
    if (minPrice) {
      filterExpression.price = { $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      filterExpression.price = {
        ...filterExpression.price,
        $lte: parseFloat(maxPrice),
      };
    }

    return await collection.find(filterExpression).toArray();
  }
  catch(err) {
    throw new ApplicationError(
      500,
      "Error in database connection! please try again later."
    );
  }

  //problem with duplicacy
  // async rate(productID, userID, rating) {
  //   let db = await getDB();
  //   let collection = await db.collection("products");

  //   return await collection.updateOne(
  //     { _id: new ObjectId(productID) },
  //     {
  //       $push: { ratings: { userID: new ObjectId(userID), rating } },
  //     }
  //   );
  // }
  // catch(err) {
  //   console.log(err);
  //   throw new ApplicationError(
  //     500,
  //     "Error in database connection! please try again later."
  //   );
  // }

  async rate(productID, userID, rating) {
    let db = await getDB();
    let collection = await db.collection("products");

    //1. deleteting if the user exist
    await collection.updateOne(
      { _id: new ObjectId(productID) },
      {
        $pull: { ratings: { userID: new ObjectId(userID) } },
      }
    );

    //2. rating product
    return await collection.updateOne(
      { _id: new ObjectId(productID) },
      {
        $push: { ratings: { userID: new ObjectId(userID), rating: rating } },
      }
    );
  }
  catch(err) {
    console.log(err);
    throw new ApplicationError(
      500,
      "Error in database connection! please try again later."
    );
  }

}
