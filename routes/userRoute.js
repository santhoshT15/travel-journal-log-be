const router = require("express").Router();
const {
  deleteUser,
  login,
  register,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

module.exports = router;
