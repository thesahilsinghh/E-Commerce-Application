import { ApplicationError } from "../../../middlewares/errorHandling.middleware.js";
import UserModel from "../../user/model/userModel.js";

//product class
export default class ProductModel {
  constructor(name, size, price, imageURL, desc, id) {
    this._id = id;
    this.imageURL = imageURL;
    this.name = name;
    this.size = size;
    this.price = price;
  }

  //rate a product
  static rate(userID, productID, rating) {
    //if user not found
    if (rating > 5 || rating < 0)
      throw new ApplicationError(400, "Rating not in range");

    let userData = UserModel.getALL().find((u) => u.id == userID);
    if (!userData) throw new ApplicationError(400, "User Not Found");

    //if product id not found
    let product = products.find((i) => i.id == productID);
    if (!product) throw new ApplicationError(400, "Product Not Found");

    //if product does'nt have a rating
    let productRating = product.rating;
    if (!productRating) {
      product.rating = [];
      product.rating.push({
        userID: userID,
        rating: rating,
      });
    } else {
      let userRating = product.rating.find((u) => u.userID == userID);

      if (userRating) {
        userRating.rating = rating;
      } else {
        product.rating.push({
          userID: userID,
          rating: rating,
        });
      }
    }
  }

  //updating a particular product
  static update(id, data) {
    let idx = products.indexOf((item) => item.id == id);
    if (idx != -1) {
      products[idx].name = data.name;
      products[idx].size = data.size;
      products[idx].price = data.price;
      return products[idx];
    }
  }

  //deleting a product
  static delete(id) {
    let idx = products.indexOf((item) => item.id == id);
    if (idx != -1) {
      let product = products[idx];
      products.splice(idx, 1);
      return product;
    }
  }
}
