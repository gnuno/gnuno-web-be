const router = require("express").Router();
const {
  getEntries,
  createEntry,
  editEntry,
} = require("../resources/entry.resource");

router.get("/", getEntries);
router.post("/", createEntry);
router.patch("/:id", editEntry);

module.exports = router;
