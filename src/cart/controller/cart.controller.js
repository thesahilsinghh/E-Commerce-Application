import CartModel from "../model/cart.model.js";

export default class CartController {
  getItems(req, res) {
    let userID = req.payload.id;
    let cart = CartModel.getItems(userID);

    if (!cart) {
      res.status(200).send("User cart's empty");
    } else {
      res.status(200).send(cart);
    }
  }
  addItem(req, res) {
    let { productID, quantity } = req.body;
    let userID = req.payload.id;
    let error = CartModel.add(userID, productID, quantity);
    if (error) {
      res.status(400).send({ error: error });
    } else {
      res.status(201).send("Product added successfully");
    }
  }

  deleteItem(req, res) {
    let { productID } = req.params;
    let userID = req.payload.id;
    let error = CartModel.delete(userID, productID);
    if (error) {
      res.status(400).send({ error: error });
    } else {
      res.status(201).send("Product added successfully");
    }
  }
}
