const express= require('express')
const { postAdminLogin, postAdminLogout, checkAdminLoggedIn } = require('../controllers/adminAuthController')

const router=express.Router()

router.post("/login", postAdminLogin)
router.post("/logout",postAdminLogout)
router.post("/check", checkAdminLoggedIn)

module.exports  =router  