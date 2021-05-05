const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");
const {
  validateRequiredFields,
  validateEmail,
  validatePassword,
} = require("../utils/Validator");
const User = require("../models/User");
const { ACCESS_KEY } = require("../config");

async function login(req, res) {
  try {
    validateRequiredFields(req.body, ["email", "password"]);
    const { email, password } = req.body;
    validateEmail(email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "invalid credentials" });
    }
    if (!validatePassword(password, user.salt, user.password)) {
      return res.status(401).send({ message: "invalid credentials" });
    }

    const token = jsonwebtoken.sign(
      { id: user._id, email: user.email, name: user.name },
      ACCESS_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    return res.status(201).send({ token });
  } catch (err) {
    switch (err.code) {
      case 400:
        return res.status(400).send({ message: err.message });
      default:
        return res.status(500).send({ message: err.message });
    }
  }
}

module.exports = { login };
