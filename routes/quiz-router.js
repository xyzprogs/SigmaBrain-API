const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")
const image_storage = require("../middleware/image-storage-middleware")

 /*quiz route */
router.get('/:quizId', QuizController.getQuiz)
router.post('/', firebase_auth, QuizController.createQuiz) //create quiz
router.delete('/:quizId', firebase_auth, QuizController.deleteQuiz)
// router.put('/:quizId', ) //update quiz
// router.delete('/:quizId', ) //deletequiz
router.get('/thumbnail/:quizId', QuizController.getQuizThumbnail)

//TODO: ERROR HANDLING
router.post('/quizThumbnail/:quizId', firebase_auth, image_storage.uploadFile, QuizController.setQuizWithThumbnail)
router.get('/popular/topquiz', QuizController.getTheMostPopularQuiz)

/*quiz question route*/
router.get('/:quizId/quizQuestion', QuizController.getQuestion)
router.post('/:quizId/quizQuestion', firebase_auth, QuizController.createQuestion)
router.delete('/quizQuestion/:questionId', firebase_auth, QuizController.deleteQuestion)

/*quiz question choice route */
router.get('/quizQuestionChoice/:choiceId', QuizController.getQuestionChoice)
router.post('/:quizId/question/:questionId/quizQuestionChoice', firebase_auth, QuizController.createQuestionChoice)
router.delete('/quizQuestionChoice/:choiceId', firebase_auth, QuizController.deleteQuestionChoice)


module.exports = router;