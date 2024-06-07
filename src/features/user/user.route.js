import express from "express";
import UserController from "./controller/user.contoller.js";
const userRoute = express.Router();

//instance of controller class
let userController = new UserController();

//route http://localhost:4200/api/users
userRoute.post("/login", (req, res) => {
  userController.login(req,res);
});
userRoute.post("/signup", (req, res) => {
  userController.signUp(req, res);
});

export default userRoute;
