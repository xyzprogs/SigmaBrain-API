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

setQuizThumbnail = (quizId, thumbnail) => {
    return new Promise((resolve, reject) => {
        const str = "UPDATE Quiz SET thumbnail = " + mysql.escape(thumbnail) + " WHERE quizId = " + mysql.escape(quizId)
        console.log(str)
        db_pool.query("UPDATE Quiz SET thumbnail = " + mysql.escape(thumbnail) + " WHERE quizId = " + mysql.escape(quizId),
                (err, result) => {
                    if(err){
                        return reject(err)
                    }
                    return resolve(result)
                })
    })
}

deleteQuiz = (id) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Quiz WHERE quizId = ` + mysql.escape(id), 
        (err, result) => {
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

createQuestion = (quizId, questionType, numberOfChoice, question) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO Question(quizId, questionType, numberOfChoice, question)
                        VALUES(` 
                        + mysql.escape(quizId) + "," 
                        + mysql.escape(questionType) + ","
                        + mysql.escape(numberOfChoice) + ','
                        + mysql.escape(question) + ')', 
                        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteQuestion = (questionId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Question WHERE questionId = ` + mysql.escape(questionId),
        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteAllQuestionInQuiz = (quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Question WHERE quizId = ` + mysql.escape(quizId),
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
        db_pool.query(`INSERT INTO QuestionChoice(questionId, quizId, is_right_choice, choice)
                        VALUES(` 
                        + mysql.escape(questionId) + "," 
                        + mysql.escape(quizId) + ","
                        + mysql.escape(is_right_choice) + ','
                        + mysql.escape(choice) + ')', 
                        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteQuestionChoice = (choiceId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM QuestionChoice WHERE choiceId = ` + mysql.escape(choiceId),
            (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

deleteAllQuestionChoiceInQuiz = (quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM QuestionChoice WHERE quizId = ` + mysql.escape(quizId),
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
    createQuestionChoice,
    deleteQuiz,
    deleteQuestion,
    deleteAllQuestionInQuiz,
    deleteQuestionChoice,
    deleteAllQuestionChoiceInQuiz,
    setQuizThumbnail
}