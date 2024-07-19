import express from "express";
import CartController from "./controller/cart.controller.js";

const cartRoute = express();

//instance of cart controller
let cartController = new CartController();

//setting up route for cart

cartRoute.get("/", (req, res) => {
  cartController.getItems(req, res);
});
cartRoute.post("/", (req, res) => {
  cartController.addItem(req, res);
});
cartRoute.delete("/delete/", (req, res) => {
  cartController.deleteItem(req, res);
});
export default cartRoute;
