const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")
const image_storage = require("../middleware/image-storage-middleware")

 /************************* quiz route **************************/
router.get('/:quizId', QuizController.getQuiz) //get quiz by quizid

router.get('/user/:userId', QuizController.getUserQuiz) //get user quizzes

/*payload:{
    quizName,
    quizCategory,
    quizDescription,
    isPublished
}*/
router.post('/', firebase_auth, QuizController.createQuiz) //create quiz

router.delete('/:quizId', firebase_auth, QuizController.deleteQuiz) //delete quiz by quizId

router.get('/thumbnail/:quizId', QuizController.getQuizThumbnail)//get thumbnail of a quiz

router.get('/category/:category', QuizController.getCategoryQuiz)//get quiz of specific kind of category

router.post('/quizThumbnail/:quizId', firebase_auth, image_storage.uploadFile, QuizController.setQuizWithThumbnail)//upload quiz thumbnail

router.get('/popular/topquiz', QuizController.getTheMostPopularQuiz)//get the most popular quiz of the site

/*
payload:{
    quizName,
    quizCategory,
    quizDescription,
    isPublished,
    questions:[
        questionType,
        numberOfChoice,
        question,
        choices[
            is_right_choice,
            choice
        ]
    ]
}
 */
router.post('/quizWithQuestions', firebase_auth, QuizController.createQuizWithQuestions)//create quiz with questions

router.delete('/quizWithQuestions/:quizId', firebase_auth, QuizController.deleteQuizWithQuestions)//delete quiz with its questions

router.get('/userTopFeatureQuiz/:userId', QuizController.getUserTopFeatureQuiz)//get the user top feature quiz

/*payload:{
    quizId
}*/
router.post('/userTopFeatureQuiz', firebase_auth, QuizController.setUserTopFeatureQuiz)//set the user top feature quiz

/*payload:{
    quizId,
    quizName,
    quizDescription,
    timeLimit,
    quizCategory
}*/
router.post('/updateQuiz', firebase_auth, QuizController.updateQuiz)

/**************************** quiz question route ****************************/
router.get('/:quizId/quizQuestion', QuizController.getQuestion)//get questions of a quiz

/*payload:{
    questionType,
    numberOfChoice,
    question
} */
router.post('/:quizId/quizQuestion', firebase_auth, QuizController.createQuestion)//create quiz question

router.delete('/quizQuestion/:questionId', firebase_auth, QuizController.deleteQuestion)//delete quiz question

/********************* quiz question choice route *********************/
router.get('/quizQuestionChoice/:choiceId', QuizController.getQuestionChoice)//get specific quiz question choice

/*planning to remove*/router.post('/:quizId/question/:questionId/quizQuestionChoice', firebase_auth, QuizController.createQuestionChoice)//create specific quiz question choice

/*payload:{
    array of {
        questionId,
        quizId,
        is_right_choice,
        choice
    }
}*/

router.post('/:quizId/multipleQuizQuestionChoice', QuizController.createMutipleQuestionChoice)//create multiple quiz question choice

router.delete('/quizQuestionChoice/:choiceId', firebase_auth, QuizController.deleteQuestionChoice)//delete specific question choice

router.get('/choicesInAQuestion/:questionId', QuizController.getChoicesInAQuestion) //Get all the choices in a question

router.get('/choicesInAQuestionWithAnswer/:questionId', firebase_auth, QuizController.getChoicesInAQuestionWithAnswer) //Get all the choices with is_right_choice in a question

/*
array of {
    questionId,
    quizId,
    is_right_choice,
    choice
}
 */
router.post('/updateQuestionChoices', firebase_auth, QuizController.updateQuestionChoices)
module.exports = router;