const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")
const image_storage = require("../middleware/image-storage-middleware")

 /*quiz route */
router.get('/:quizId', QuizController.getQuiz) //get quiz by quizid
router.get('/user/:userId', QuizController.getUserQuiz) //get user quizzes
router.post('/', firebase_auth, QuizController.createQuiz) //create quiz
router.delete('/:quizId', firebase_auth, QuizController.deleteQuiz) //delete quiz by quizId
// router.put('/:quizId', ) //update quiz
// router.delete('/:quizId', ) //deletequiz
router.get('/thumbnail/:quizId', QuizController.getQuizThumbnail)//get thumbnail of a quiz
router.get('/category/:category', QuizController.getCategoryQuiz)//get quiz of specific kind of category
router.post('/quizThumbnail/:quizId', firebase_auth, image_storage.uploadFile, QuizController.setQuizWithThumbnail)//upload quiz thumbnail
router.get('/popular/topquiz', QuizController.getTheMostPopularQuiz)//get the most popular quiz of the site
router.post('/quizWithQuestions', firebase_auth, QuizController.createQuizWithQuestions)//create quiz with questions
router.delete('/quizWithQuestions/:quizId', firebase_auth, QuizController.deleteQuizWithQuestions)

/*quiz question route*/
router.get('/:quizId/quizQuestion', QuizController.getQuestion)//get specific quiz question
router.post('/:quizId/quizQuestion', firebase_auth, QuizController.createQuestion)//create quiz question
router.delete('/quizQuestion/:questionId', firebase_auth, QuizController.deleteQuestion)//delete quiz question

/*quiz question choice route */
router.get('/quizQuestionChoice/:choiceId', QuizController.getQuestionChoice)//get specific quiz question choice
/*planning to remove*/router.post('/:quizId/question/:questionId/quizQuestionChoice', firebase_auth, QuizController.createQuestionChoice)//create specific quiz question choice
router.post('/:quizId/multipleQuizQuestionChoice', QuizController.createMutipleQuestionChoice)//create multiple quiz question choice
router.delete('/quizQuestionChoice/:choiceId', firebase_auth, QuizController.deleteQuestionChoice)//delete specific question choice


module.exports = router;