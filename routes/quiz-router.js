const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")

router.get('/:quizId', QuizController.getQuiz)
router.post('/', firebase_auth, QuizController.createQuiz) //create quiz
// router.put('/:quizId', ) //update quiz
// router.delete('/:quizId', ) //deletequiz

module.exports = router;