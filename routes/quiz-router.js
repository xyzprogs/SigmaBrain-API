const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")
const image_storage = require("../middleware/image-storage-middleware")

 /************************* quiz route **************************/
router.get('/:quizId', QuizController.getQuiz) //get quiz by quizid

router.get('/user/:userId', QuizController.getUserQuiz) //get user quizzes

router.get('/quizWithUser/:quizId', QuizController.getQuizWithUser)
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

router.get('/search/:search', QuizController.getQuizSearchName) // get quiz name base on seaches

router.get('/searchQuiz/:search', QuizController.getSearchQuiz) // get quiz base on searches

router.get('/main/takelater', firebase_auth, QuizController.getTakeLater) // get take later

router.get('/main/likedquiz', firebase_auth, QuizController.getLikedQuiz) // get liked quiz

router.get('/main/subscriptionquiz', firebase_auth, QuizController.getSubscriptionQuiz) // get quiz from user's subscriptions.

router.post('/takelater', firebase_auth, QuizController.createTakeLater) // create take quiz

router.post('/likedquiz', firebase_auth, QuizController.createLikedQuiz) // create liked quiz

router.delete('/takelater/:quizId', firebase_auth, QuizController.deleteTakeLater) // delete take later

router.delete('/likedquiz/:quizId', firebase_auth, QuizController.deleteLikedQuiz) // delete liked quiz
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

router.get('/getTopQuizByCategory/:category', QuizController.getTopQuizByCategory)

router.post('/getMoreQuizByCategoryById', QuizController.getMoreQuizByCategoryById)

router.get('/searchMore/getMoreSearchResult', QuizController.getMoreSearchQuiz)

router.post('/history/create', firebase_auth, QuizController.createQuizHistory)

router.post('/history/get', firebase_auth, QuizController.getQuizHistory)

router.get('/authenticated/quiz', firebase_auth, QuizController.getUserQuizAuthenticated)

router.post('/publish/quiz', firebase_auth, QuizController.publishQuiz)

router.post('/admin/publishquiz', firebase_auth, QuizController.adminBlockQuiz)

router.get('/admin/userquiz/:quizId', firebase_auth, QuizController.getUserQuizAdmin)

router.delete('/admin/userquiz/:quizId', firebase_auth, QuizController.adminRemoveQuiz)

router.get('/quiz/likedStatus/:quizId', firebase_auth, QuizController.getLikedStatusOnQuiz)

router.get('/quiz/takelaterStatus/:quizId', firebase_auth, QuizController.checkTakeLaterStatus)
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
//router.get('/quizQuestionChoice/:choiceId', QuizController.getQuestionChoice)//get specific quiz question choice

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

/*quiz question choice route */
router.get('/quizQuestionChoice/:questionId', QuizController.getQuestionChoice)
router.get('/getQuestionChoicesByQuizId/:quizId', QuizController.getQuestionChoicesByQuizId)

router.post('/:quizId/question/:questionId/quizQuestionChoice', firebase_auth, QuizController.createQuestionChoice)
router.post('/:quizId/multipleQuizQuestionChoice', QuizController.createMutipleQuestionChoice)
router.delete('/quizQuestionChoice/:choiceId', firebase_auth, QuizController.deleteQuestionChoice)
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

router.post('/createQuizGrade', firebase_auth, QuizController.createQuizGrade);

router.post('/updateQuestionChoices', firebase_auth, QuizController.updateQuestionChoices)

router.post('/quizComment', firebase_auth, QuizController.createQuizComment)

router.get('/quizComment/:quizId', QuizController.getQuizComment)

router.get('/quizCommenyById/:quizCommentId', QuizController.getQuizCommentByCommentId)
module.exports = router;