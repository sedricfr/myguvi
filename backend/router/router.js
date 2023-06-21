const express = require("express");
const router = express.Router();
const userController = require("../Controller/controller");
const cors = require("cors")


//=======================> User <====================

router.post("/api/user/signup", userController.register);
router.post("/api/user/login", userController.loginUser);
router.get("api/user/${userId}",userController.fetchUserbio);
router.post("/api/user/bio", userController.editProfile);
router.post("/api/user/logout", userController.logout);



module.exports = router;
