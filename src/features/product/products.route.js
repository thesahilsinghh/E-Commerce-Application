import express from "express";
import ProductController from "./controller/productContoller.js";
import { uploadFile } from "../../middlewares/file.upload.js";

// Declaring router for handling product's managing requests.
const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", productController.getAll);
productRouter.post( "/", uploadFile.single("imageURL"),  productController.addProduct);
productRouter.get("/filter", productController.filterProduct);
productRouter.post('/rate',productController.rateProduct);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
