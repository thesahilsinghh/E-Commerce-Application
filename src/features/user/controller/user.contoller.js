import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import UserRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";
//controller calss
export default class UserController {
  //constructor
  constructor() {
    this.UserRepository = new UserRepository();
  }

  //signup
  async signUp(req, res) {
    let hashedPasscode = await bcrypt.hash(req.body.password, 11);
    let newUser = new UserModel(
      req.body.name,
      req.body.email,
      hashedPasscode,
      req.body.type
    );
    await this.UserRepository.signUp(newUser);
    res.status(200).send(newUser);
  }

  //login
  async login(req, res) {
    let user = await this.UserRepository.getUser(req.body.email);
    if (user) {
      //compare
      let isValid = await bcrypt.compare(req.body.password, user.password);
      if (isValid) {
        let token = jwt.sign(
          { id: user._id, email: user.email, type: user.type },
          process.env.jwt_token,
          { expiresIn: "1h" }
        );

        // res.cookie("jwtToken", token, { maxAge: 900000, httpOnly: false });
        // Send token as response
        res.status(200).send(token);
      } else {
        res.status(400).send("Wrong Password!, try again");
      }
    } else {
      res.status(400).send("User Not Found");
    }
  }
}
