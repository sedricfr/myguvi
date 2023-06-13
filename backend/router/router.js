const express = require("express");
const router = express.Router();
const userController = require("../Controller/controller");

//=======================> User <====================

router.post("/api/user/signup", userController.register);
router.post("/api/user/login", userController.loginUser);
router.post("/api/user/logout", userController.logout);


module.exports = router;
