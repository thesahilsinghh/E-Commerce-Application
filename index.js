//importing packages
import express from "express";
import productRouter from "./src/features/product/products.route.js";
import userRoute from "./src/features/user/user.route.js";
// import authorizer from "./src/middlewares/basic.auth.js";
import jwtAuthenticate from "./src/middlewares/jwtAuth.js";
import cartRoute from "./src/features/cart/cart.routes.js";
import cors from "cors";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/middlewares/errorHandling.middleware.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
//defining app
const app = express();

//using middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/user/", userRoute);
app.use("/api/products/", loggerMiddleware, jwtAuthenticate, productRouter);
app.use("/api/cart/", loggerMiddleware, jwtAuthenticate, cartRoute);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to E-Commerce API");
});

//for documentation
app.use("/api/api-docs/", swagger.serve, swagger.setup(apiDocs));

//if route is not valid
app.use("", (req, res) => {
  res.status(404).send("API not found. Please check your URL.");
});

//error handling
app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }

  return res.status(500).send("Something went wrong, please try again later");
});

//port listens on 4200
app.listen("4200", () => {
  console.log("Server is listening on 4200");
  connectToMongoDB();
});
