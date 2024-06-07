import ProductModel from "../../product/model/product.model.js";
import UserModel from "../../user/model/userModel.js";

let carts = [];

export default class CartModel {
  constructor(userId) {
    this.userId = userId;
    this.cart = [];
  }

  // Get user's cart
  static getItems(userId) {
    const userCart = carts.find((cart) => cart.userId === userId);
    return userCart ? userCart.cart : null;
  }

  // Add to cart
  static add(userId, productId, quantity) {
    const userData = UserModel.getALL().find((user) => user.id === userId);
    if (!userData) return { success: false, msg: "User Not Found" };

    const product = ProductModel.getAll().find((item) => item.id === productId);
    if (!product) return { success: false, msg: "Product Not Found" };

    let userCart = carts.find((cart) => cart.userId === userId);
    if (!userCart) {
      // If user has no cart yet, create a new one
      userCart = new CartModel(userId);
      carts.push(userCart);
    }

    // Check if product already exists in the cart
    const existingProduct = userCart.cart.find(
      (item) => item.productID === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      userCart.cart.push({ productID: productId, quantity: quantity });
    }

    return { success: true, msg: "Product added to cart successfully" };
  }

  //delete from cart
  //delete from cart
  static delete(userID, productID) {
    let userCart = carts.find((cart) => cart.userId === userID);
    if (!userCart) return { success: false, msg: "User Not Found" };

    // Find the index of the product in the cart
    console.log(userCart.cart);
    const existingProductIndex = userCart.cart.findIndex(
      (item) => item.productID == productID
    );

    // Check if product exists in the cart
    if (existingProductIndex == -1) {
      return { success: false, msg: "Product Not Found" };
    } else {
      // Remove the product from the cart
      userCart.cart.splice(existingProductIndex, 1);
      return { success: true, msg: "Product removed from cart successfully" };
    }
  }
}
