var admin = require('firebase-admin');
var quizMysql = require('../db/quiz-mysql');
const HEADER_CONSTANT = require('../constant/header');

getQuiz = async (req, res)=>{
    let result = await quizMysql.getQuiz(1)
    console.log(result)
    res.sendStatus(200);
}

module.exports = {
    getQuiz
}