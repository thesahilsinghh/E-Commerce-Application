import CartModel from "../model/cart.model.js";
import CartRepository from "../repository/cart.repositoy.js";

export default class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  //get items
  async getItems(req, res) {
    try {
      let userID = req.payload.id;
      let cart = await this.cartRepository.getItems(userID);
      res.status(200).send(cart);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error found! Please try again later");
    }
  }

  //add item
  async addItem(req, res) {
    let { productID, quantity } = req.body;
    let userID = req.payload.id;
    let cartProduct = new CartModel(userID, productID, quantity);
    await this.cartRepository.add(cartProduct);
    return res.status(200).send("Product added to cart!");
  }

  async deleteItem(req, res) {
    let { productID } = req.body;
    let userID = req.payload.id;
    let isDone = await this.cartRepository.delete(userID, productID);
    if (!isDone) {
      res.status(400).send("Product not found!");
    } else {
      res.status(201).send("Product deleted successfully");
    }
  }
}
