const { RequiredFieldError, InvalidFieldError } = require("../errors");
const { default: validator } = require("validator");
const crypto = require("crypto");

const validateRequiredFields = (body, fields) => {
  const keys = Object.keys(body);
  fields.forEach((field) => {
    if (!keys.includes(field)) {
      throw new RequiredFieldError(field);
    }
  });
  return;
};

const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new InvalidFieldError("email");
  }
  return;
};

const validatePassword = (value, salt, encrypted) => {
  const hashedValue = crypto.createHash("sha1").update(value).digest("hex");
  const password = crypto
    .createHash("sha1")
    .update(hashedValue)
    .update(salt)
    .digest("hex");

  return password === encrypted;
};

module.exports = { validateRequiredFields, validateEmail, validatePassword };
