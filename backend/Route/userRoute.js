const express = require('express')
const {signup,login,findUserDetails} = require('../controller/userController')
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/find-user-details',findUserDetails)
module.exports = router