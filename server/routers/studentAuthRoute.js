const express= require("express");
const { postStudLogin, postStudLogout, checkStudLoggedIn } = require("../controllers/studentAuthController");
const router= express.Router()



router.post("/login", postStudLogin)
router.post("/logout",postStudLogout)
router.get("/check",checkStudLoggedIn)


module.exports = router;