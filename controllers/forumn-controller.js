const BODY = require('../constant/body');
const MYSQL_CONSTANT = require('../constant/mysql')
var forumnMysql = require('../db/forumn-mysql')

createForumnPost = async (req, res)=>{
    try{
        let ownerId = req.body[BODY.OWNERID]
        const userId = res.locals.decodedToken[BODY.UID]
        let postTitle = req.body[BODY.POSTTITLE]
        let postDescription = req.body[BODY.POSTDESCRIPTION]
        let response = await forumnMysql.createForumnPost(ownerId, userId, postTitle, postDescription)
        res.status(201).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createPostComment = async (req, res)=>{
    try{
        let forumPostId = req.body[BODY.FORUMPOSTID]
        const userId = res.locals.decodedToken[BODY.UID]
        let postComment = req.body[BODY.POSTCOMMENT]
        let response = await forumnMysql.createPostComment(forumPostId, userId, postComment)
        res.status(201).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createCommentReply = async (req, res)=>{
    try{
        let forumPostCommentId = req.body[BODY.FORUMPOSTCOMMENTID]
        const userId = res.locals.decodedToken[BODY.UID]
        let reply = req.body[BODY.REPLY]
        let response = await forumnMysql.createCommentReply(forumPostCommentId, userId, reply)
        res.status(201).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

selectForumnPost = async (req, res)=>{
    try{
        let userId = req.params.userId
        let row = req.query.row
        console.log("row is", row)
        let body = {
            [BODY.UID]: userId,
            [BODY.ROW]: row
        }
        let response = await forumnMysql.selectForumnPost(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

selectPostComment = async (req, res)=>{
    try{
        let forumPostId = req.params.forumPostId
        let response = await forumnMysql.selectPostComment(forumPostId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

selectCommentReply = async (req, res)=>{
    try{
        let forumPostCommentId = req.params.forumPostCommentId
        let response = await forumnMysql.selectCommentReply(forumPostCommentId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteForumPost = async (req, res)=>{
    try{
        let forumPostId = req.body.forumPostId
        let response = await forumnMysql.deleteForumPost(forumPostId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteForumPostComment = async (req, res)=>{
    try{
        let forumPostCommentId = req.body.forumPostCommentId
        let response = await forumnMysql.deleteForumPostComment(forumPostCommentId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteForumPostCommentReply = async (req, res)=>{
    try{
        let forumPostCommentReplyId = req.body.forumPostCommentReplyId
        let response = await forumnMysql.deleteForumPostCommentReply(forumPostCommentReplyId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getForumPostById = async(req, res)=>{
    try{
        let forumPostId = req.params.forumPostId
        let response = await forumnMysql.getForumPostById(forumPostId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    createForumnPost,
    createPostComment,
    createCommentReply,   
    selectForumnPost,
    selectPostComment,
    selectCommentReply,
    deleteForumPost,
    deleteForumPostComment,
    deleteForumPostCommentReply,
    getForumPostById
}