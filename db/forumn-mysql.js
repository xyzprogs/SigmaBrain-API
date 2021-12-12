const db_pool = require('./mysql-init');
const mysql  = require('mysql2');
const BODY = require('../constant/body');

createForumnPost = (ownerId, userId, postTitle, postDescription)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`INSERT INTO ForumPost(ownerId, userId, postTitle, postDescription) VALUES (${mysql.escape(ownerId)}, ${mysql.escape(userId)}, ${mysql.escape(postTitle)}, ${mysql.escape(postDescription)})`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createPostComment = (forumPostId, userId, postComment)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`INSERT INTO ForumPostComment(forumPostId, userId, postComment) VALUES (${mysql.escape(forumPostId)}, ${mysql.escape(userId)}, ${mysql.escape(postComment)})`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createCommentReply = (forumPostCommentId, userId, reply) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`INSERT INTO ForumPostCommentReply(forumPostCommentId, userId, reply) VALUES(${mysql.escape(forumPostCommentId)}, ${mysql.escape(userId)}, ${mysql.escape(reply)})`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

selectForumnPost = ({uid, row}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM ForumPost WHERE ownerId=${mysql.escape(uid)} ORDER BY creationTime DESC LIMIT 10`;
        if(row!=null && row!==undefined && row!=='undefined'){
            myquery = `SELECT * FROM ForumPost WHERE ownerId=${mysql.escape(uid)} ORDER BY creationTime DESC LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

selectPostComment = ({forumPostId, row}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT ForumPostComment.*, Users.displayName FROM ForumPostComment 
        INNER JOIN Users ON ForumPostComment.userId = Users.userId
        WHERE forumPostId=${mysql.escape(forumPostId)} LIMIT 10`
        if(row!=null && row!==undefined && row!=='undefined'){
            myquery = `SELECT ForumPostComment.*, Users.displayName FROM ForumPostComment 
            INNER JOIN Users ON ForumPostComment.userId = Users.userId
            WHERE forumPostId=${mysql.escape(forumPostId)} LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

selectCommentReply = (forumPostCommentId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM ForumPostCommentReply WHERE forumPostCommentId=${forumPostCommentId} LIMIT 10`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteForumPost = (forumPostId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE FROM ForumPost WHERE forumPostId=${mysql.escape(forumPostId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteForumPostComment = (forumPostCommentId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE FROM ForumPostComment WHERE forumPostCommentId=${mysql.escape(forumPostCommentId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteForumPostCommentReply = (forumPostCommentReplyId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE FROM ForumPostCommentReply WHERE forumPostCommentReplyId=${mysql.escape(forumPostCommentReplyId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getForumPostById = (forumPostId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT ForumPost.*, Users.displayName FROM ForumPost
        INNER JOIN Users ON ForumPost.userId = Users.userId
        WHERE forumPostId = ${mysql.escape(forumPostId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
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