import express from "express";
import ProductController from "./controller/productContoller.js";
import multer from "multer";

// Declaring router for handling product's managing requests.
const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", productController.getAll);
productRouter.post("/", productController.addProduct);
productRouter.get("/filter", productController.filterProduct);
productRouter.get("/:id", productController.getProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
