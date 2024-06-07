import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../middlewares/errorHandling.middleware.js";

class UserRepository {
  async signUp(newUser) {
    try {
      let db = await getDB();
      let collection = db.collection("users");
      collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new ApplicationError(
        503,
        "Some error occured, please try again later!"
      );
    }
  }
  async getUser(email) {
    try {
      let db = await getDB();
      let collection = db.collection("users");
      return collection.findOne({ email });
    } catch (err) {
      throw new ApplicationError(
        503,
        "Some error occured in database, please try again later!"
      );
    }
  }
}
export default UserRepository;
