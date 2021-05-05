require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL,
  ACCESS_KEY: process.env.ACCESS_KEY,
};
