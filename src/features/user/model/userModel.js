import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../middlewares/errorHandling.middleware.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  
  

  static getALL() {
    return users;
  }
}
let users = [
  {
    id: 1,
    name: "user",
    email: "user@gmail.com",
    password: "password123",
    type: "customer",
  },
];
