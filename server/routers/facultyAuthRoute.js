const express= require("express");
const { postFacLogin, postFacLogout, checkFacLoggedIn } = require("../controllers/facultyAuthController");
const router= express.Router()



router.post("/login", postFacLogin)
router.post("/logout",postFacLogout)
router.get("/check",checkFacLoggedIn)


module.exports = router;  