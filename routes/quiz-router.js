const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router()

router.get('/', QuizController.getQuiz)

module.exports = router;