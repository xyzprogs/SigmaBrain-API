const express = require('express')
const TestController = require('../controllers/test-controller')
const router = express.Router()

router.get('/user', TestController.testUser)

module.exports = router