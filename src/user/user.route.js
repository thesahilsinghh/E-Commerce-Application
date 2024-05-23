import express from "express";
import UserController from "./controller/user.contoller.js";
const userRoute = express.Router();
let userController = new UserController();

userRoute.post("/login", userController.login);
userRoute.post("/signup", userController.signUp);

export default userRoute;
