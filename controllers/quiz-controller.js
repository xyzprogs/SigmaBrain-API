var admin = require('firebase-admin');
var quizMysql = require('../db/quiz-mysql');
const HEADER_CONSTANT = require('../constant/header');

getQuiz = async (req, res)=>{
    let id = req.params.id;
    let result = await quizMysql.getQuiz(id);
    let questionResult = await quizMysql.getQuestion(id);
    let questionChoices = []
    for(var i = 0; i < questionResult.length; i++){
        let questionId = questionResult[i]["questionId"]
        let questionChoice = await quizMysql.getQuestionChoice(questionId)
        questionChoices.push(questionChoice)
    }
    questionSet = {
        "quiz": result,
        "quizQuestion": questionResult,
        "quizQuestionChoice": questionChoices
    }
    questionSet["quizQuestionChoice"][0][1]["is_right_choice"]
    console.log(questionSet["quizQuestionChoice"][0][1]["is_right_choice"])
    res.sendStatus(200);
}

getQuestion = async (req,res)=>{

}

getQuestionChoice = async (req,res)=>{

}


module.exports = {
    getQuiz
}