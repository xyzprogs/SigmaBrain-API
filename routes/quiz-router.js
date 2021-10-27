const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")

 /*quiz route */
router.get('/:quizId', QuizController.getQuiz)
router.post('/', firebase_auth, QuizController.createQuiz) //create quiz
// router.put('/:quizId', ) //update quiz
// router.delete('/:quizId', ) //deletequiz

/*quiz question route*/
router.get('/:quizId/quizQuestion', QuizController.getQuestion)
router.post('/:quizId/quizQuestion', firebase_auth, QuizController.createQuestion)

/*quiz question choice route */
// router.get('/quizQuestionChoice/:questionChoiceId', QuizController.getQuestionChoice)
router.post('/:quizId/question/:questionId/quizQuestionChoice', firebase_auth, QuizController.createQuestionChoice)
module.exports = router;