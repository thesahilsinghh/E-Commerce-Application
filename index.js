//importing packages
import express from "express";
import productRouter from "./src/product/products.route.js";
import userRoute from "./src/user/user.route.js";
// import authorizer from "./src/middlewares/basic.auth.js";
import jwtAuthenticate from "./src/middlewares/jwtAuth.js";
import cookieParser from "cookie-parser";
import cartRoute from "./src/cart/cart.routes.js";
import cors from "cors";
import apiDocs from "swagger.json" assert { type: "json" };
import swagger, { serve } from "swagger-ui-express";
//defining app
const app = express();

//using middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//routes
app.use("/api/products/", jwtAuthenticate, productRouter);
app.use("/api/user/", userRoute);
app.use("/api/cart/", jwtAuthenticate, cartRoute);
app.use("api/api-docs/", swagger - serve, swagger.setup(apiDocs));
app.use("", (req, res) => {
  res.status(404).send("API not found. Please check your URL.");
});
app.listen("4200", () => {
  console.log("Server is listening on 4200");
});
