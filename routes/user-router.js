const express = require('express')
const UserController = require('../controllers/user-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")
const image_store = require("../middleware/image-storage-middleware")
/*TEST PURPOSE*/
router.post('/login', UserController.loginUser)
router.post('/register', UserController.registerUser)
router.get('/testverify', UserController.testVerify)
router.get('/verify', firebase_auth, UserController.verifyUser)
/*TEST PURPOSE*/

router.post('/create', firebase_auth, UserController.createUser) //create new user
router.get('/leaderboard', UserController.getMainLeaderboard ) //get leaderboard information
router.get('/leaderboard/:ownerId', UserController.getChannelLeaderboard)// Get leaderboard based on the leaderboard id
//router.put('/forgetpassword', )
//router.put('/changepassword', )
//router.put('/changedisplayname')
router.get('/profile/profileImage/:userId', UserController.getUserProfileImage) //get user profile image
router.get('/profile/backgroundImage/:userId', UserController.getUserBackgroundImage) //get user background image
router.get('/profile/userDescription/:userId', UserController.getUserDescription) //get user description
router.post('/profile/setUserProfileImage', firebase_auth, image_store.uploadUserProfileFile, UserController.setUserProfileImage)//set user profile image
router.post('/profile/setUserBackgroundImage', firebase_auth, image_store.uploadUserProfileFile, UserController.setUserBackgroundImage)//set user background image
router.post('/profile/setUserDescription', firebase_auth, UserController.setUserDescription) //set user description
router.post('/profile/setTopFeatureQuiz', firebase_auth, UserController.setUserTopFeatureQuiz) //set user top feature quiz
router.get('/info/:userId', UserController.getUserInfo)
router.get('/displayname/:userId', UserController.getUserDisplayName)
router.put('/updateUserExperience', UserController.updateUserExperience)
router.put('/updateUserDisplayName', firebase_auth, UserController.updateUserDisplayName)
//Subscribe
router.post('/subscribe', firebase_auth, UserController.createSubscribe)
router.post('/unsubscribe', firebase_auth, UserController.cancelSubscribe)
router.get('/subscriptions', firebase_auth, UserController.getSubscriptions)
router.get('/followers', firebase_auth, UserController.getFollowers)
router.post('/getMoreSubscriptionsById', firebase_auth, UserController.getMoreSubscriptionsById)
module.exports = router