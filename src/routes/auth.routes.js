const router = require("express").Router();
const { login } = require("../resources/auth.resource");

router.post("/login", login);

module.exports = router;
