import express from "express";
import ProductController from "./controller/productContoller.js";
import { uploadFile } from "../../middlewares/file.upload.js";

// Declaring router for handling product's managing requests.
const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", (req, res) => {
  productController.getAll(req, res);
});
productRouter.post("/", uploadFile.single("imageURL"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/filter", (req, res) => {
  productController.filterProduct(req, res);
});
productRouter.post("/rate", (req, res,) => {
    productController.rateProduct(req, res);
  });
productRouter.get("/:id", (req, res) => {
  productController.getProduct(req, res);
});
productRouter.post("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
