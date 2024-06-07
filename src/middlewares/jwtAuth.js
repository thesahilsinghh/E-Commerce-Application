import jwt from "jsonwebtoken";
const jwtAuthenticate = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  if (!jwtToken) {
    return res.status(401).send("login first");
  }
  try {
    const payload = jwt.verify(jwtToken, process.env.jwt_token);
    req.payload = payload;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid access");
  }
};

export default jwtAuthenticate;
