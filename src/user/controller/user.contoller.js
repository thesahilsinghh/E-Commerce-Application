import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

//controller calss
export default class UserController {
  //login
  login(req, res) {
    let user = UserModel.login(req.body.email, req.body.password);
    if (user) {
      let token = jwt.sign(
        { id: user.id, email: user.email, type: user.type },
        "sBEQSfVynYsH05Yl1oj1iN0nHDLufhyr",
        { expiresIn: "1h" }
      );

      res.cookie("jwtToken", token, { maxAge: 900000, httpOnly: false });

      // Send token as response
      res.status(200).send(token);
    } else {
      res.status(400).send("User Not Found");
    }
  }

  //signup
  signUp(req, res) {
    UserModel.signUp(req.body);
    res.status(200).send("User SignedUp successfully");
  }
}
