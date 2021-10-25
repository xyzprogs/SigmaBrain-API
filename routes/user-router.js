const express = require('express')
const UserController = require('../controllers/user-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")

router.post('/login', UserController.loginUser)
router.post('/register', UserController.registerUser)
router.get('/testverify', UserController.testVerify)
router.get('/verify', UserController.verifyUser)
router.post('/create', firebase_auth, UserController.createUser)

module.exports = router