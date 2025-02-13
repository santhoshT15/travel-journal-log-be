const router = require("express").Router();
const {
  createEntry,
  deleteEntry,
  getEntries,
  getEntry,
  updateEntry,
} = require("../controllers/entryController");

router.post("/new", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.get("/author/:userId", getEntries);
router.get("/:id", getEntry);

module.exports = router;
