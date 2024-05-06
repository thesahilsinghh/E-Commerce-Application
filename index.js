import express from "express";
import productRouter from "./src/product/products.root.js";
const app = express();

app.use("/api/products/", productRouter);
app.listen("4200", () => {
  console.log("Server is listening on 4200");
});
