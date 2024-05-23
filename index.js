//importing packages
import express from "express";
import productRouter from "./src/product/products.route.js";
import userRoute from "./src/user/user.route.js";
// import authorizer from "./src/middlewares/basic.auth.js";
import jwtAuthenticate from "./src/middlewares/jwtAuth.js";

import cartRoute from "./src/cart/cart.routes.js";
import cors from "cors";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
//defining app
const app = express();

//using middlewares
app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

//routes
app.use("/api/user/", userRoute);
app.use("/api/products/", jwtAuthenticate, productRouter);
app.use("/api/cart/", jwtAuthenticate, cartRoute);

//for documentation
app.use("/api/api-docs/", swagger.serve, swagger.setup(apiDocs));

//if route is not valid
app.use("", (req, res) => {
  res.status(404).send("API not found. Please check your URL.");
});

//port listens on 4200
app.listen("4200", () => {
  console.log("Server is listening on 4200");
});
