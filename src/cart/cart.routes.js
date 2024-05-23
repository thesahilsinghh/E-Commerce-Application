import express from "express";
import CartController from "./controller/cart.controller.js";

const cartRoute = express();

//instance of cart controller
let cartController = new CartController();

//setting up route for cart

cartRoute.get("/", cartController.getItems);
cartRoute.post("/", cartController.addItem);
cartRoute.post("/delete/:productID", cartController.deleteItem);
export default cartRoute;
