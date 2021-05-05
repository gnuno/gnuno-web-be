const router = require("express").Router();
const { getEntries, createEntry } = require("../resources/entry.resource");

router.get("/", getEntries);
router.post("/", createEntry);

module.exports = router;
