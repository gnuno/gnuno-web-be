const router = require("express").Router();
const {
  getEntries,
  createEntry,
  editEntry,
  deleteEntry,
} = require("../resources/entry.resource");

router.get("/", getEntries);
router.post("/", createEntry);
router.patch("/:id", editEntry);
router.delete("/:id", deleteEntry);

module.exports = router;
