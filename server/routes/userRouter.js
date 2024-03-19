const Router = require("express");
const router = new Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/refresh", UserController.refresh);

module.exports = router;
