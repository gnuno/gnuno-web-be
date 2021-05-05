const jsonwebtoken = require("jsonwebtoken");
const { ACCESS_KEY } = require("../config");

const verifyToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).send({ message: "You are not logged in" });
  }

  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "You are not logged in" });
  }

  let decoded;
  try {
    decoded = jsonwebtoken.verify(token, ACCESS_KEY);
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
  req.user = decoded;

  next();
};

module.exports = { verifyToken };
