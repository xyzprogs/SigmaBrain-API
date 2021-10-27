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

createQuiz = (userId, quizName, quizCatgeory, quizDescription, isPublished) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO Quiz(userId, quizName, quizCatgeory, quizDescription, isPublished)
                        VALUES(` 
                        + mysql.escape(userId) + ','
                        + mysql.escape(quizName) + ','
                        + mysql.escape(quizCatgeory) + ','
                        + mysql.escape(quizDescription) + ','
                        + mysql.escape(isPublished) + ')', 
                        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteQuiz = (id) => {
    
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

createQuestion = (quizId, questionType, numberOfChoice, question) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO QuestionChoice(quizId, questionType, numberOfChoice, question)
                        VALUES(` 
                        + mysql.escape(quizId) + "," 
                        + mysql.escape(questionType) + ","
                        + mysql.escape(numberOfChoice) + ','
                        + '"' + mysql.escape(question) + '")', 
                        (err, result)=>{
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

createQuestionChoice = (questionId, quizId, is_right_choice, choice) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO Question(quizId, questionType, numberOfChoice, question)
                        VALUES(` 
                        + mysql.escape(questionId) + "," 
                        + mysql.escape(quizId) + ","
                        + mysql.escape(is_right_choice) + ','
                        + '"' + mysql.escape(choice) + '")', 
                        (err, result)=>{
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
    getQuestionChoice,
    createQuiz,
    createQuestion,
    createQuestionChoice
}