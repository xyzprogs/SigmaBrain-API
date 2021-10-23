const db_pool = require('./mysql-init');
const mysql  = require('mysql2');

getQuiz = (id) => {
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM Quiz WHERE quizId = ' + mysql.escape(id), (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuestion = (quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM Question WHERE quizId = ' + mysql.escape(quizId), (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuestionChoice = (questionId) => {
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM QuestionChoice WHERE questionId = ' + mysql.escape(questionId), (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = {
    getQuiz,
    getQuestion,
    getQuestionChoice
}