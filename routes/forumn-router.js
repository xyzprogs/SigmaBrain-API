const express = require('express')
const ForumnController = require('../controllers/forumn-controller')
const router = express.Router()
const firebase_auth = require("../firebase/firebase_auth")

router.get('/:userId', ForumnController.selectForumnPost)
router.get('/id/:forumPostId', ForumnController.getForumPostById)
router.post('/', firebase_auth, ForumnController.createForumnPost)
router.delete('/:forumPostId', firebase_auth, ForumnController.deleteForumPost)

router.get('/postComments/:forumPostId', ForumnController.selectPostComment)
router.post('/postComment', firebase_auth, ForumnController.createPostComment)
router.delete('/postComment/:forumPostCommentId', firebase_auth, ForumnController.deleteForumPostComment)

router.get('/postCommentReply/:forumPostCommentId', ForumnController.selectCommentReply)
router.post('/postCommentReply', firebase_auth, ForumnController.createCommentReply)
router.delete('/postCommentReply/:forumPostCommentReplyId', firebase_auth, ForumnController.deleteForumPostCommentReply )

module.exports = router;