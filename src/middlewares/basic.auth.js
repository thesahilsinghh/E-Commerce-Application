import UserModel from "../user/model/userModel.js";

const authorizer = (req, res, next) => {
  const author = req.headers["authorization"];
  if (!author) {
   return res.status(401).send("unauthorized");
  }
  console.log(author);
  let base64cred = author.replace("Basic ", "");

  let decode = Buffer.from(base64cred, "base64").toString("utf8");

  let value = decode.split(":");

  let isValid = UserModel.getALL().find(
    (u) => u.email == value[0] && u.password == value[1]
  );

  if (!isValid) {
   return res.status(401).send("unauthorized, enter correct id password");
  }
  next();
};

export default authorizer;
