var admin = require('firebase-admin');
var quizMysql = require('../db/quiz-mysql');
const HEADER_CONSTANT = require('../constant/header');
const BODY_CONSTANT = require('../constant/body');
// let id = req.params.id;
// let result = await quizMysql.getQuiz(id);
// let questionResult = await quizMysql.getQuestion(id);
// let questionChoices = []
// for(var i = 0; i < questionResult.length; i++){
//     let questionId = questionResult[i]["questionId"]
//     let questionChoice = await quizMysql.getQuestionChoice(questionId)
//     questionChoices.push(questionChoice)
// }
// questionSet = {
//     "quiz": result,
//     "quizQuestion": questionResult,
//     "quizQuestionChoice": questionChoices
// }
// questionSet["quizQuestionChoice"][0][1]["is_right_choice"]
// console.log(questionSet["quizQuestionChoice"][0][1]["is_right_choice"])
// res.sendStatus(200);

getQuiz = async (req, res)=>{
    try{
        let id = req.params.id;
        let result = await quizMysql.getQuiz(id);
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuiz = async (req, res) => {
    try{
        const userId = res.locals.decodedToken[BODY_CONSTANT.UID]
        const quizName = req.body[BODY_CONSTANT.QUIZNAME]
        const quizCatgeory = req.body[BODY_CONSTANT.QUIZCATEGORY]
        const quizDescription = req.body[BODY_CONSTANT.QUIZDESCRIPTION]
        const isPublished = req.body[BODY_CONSTANT.ISPUBLISHED]
        const quiz = {
            [BODY_CONSTANT.QUIZNAME]: req.body[BODY_CONSTANT.QUIZNAME],
            [BODY_CONSTANT.QUIZCATEGORY]: req.body[BODY_CONSTANT.QUIZCATEGORY],
            [BODY_CONSTANT.QUIZDESCRIPTION]: req.body[BODY_CONSTANT.QUIZDESCRIPTION],
            [BODY_CONSTANT.ISPUBLISHED]: req.body[BODY_CONSTANT.ISPUBLISHED]
        }
        console.log(quiz)
        console.log(userId)
        /* if any of the required paramters is empty, return error */
        if(!userId || !quizName || quizCatgeory==null || !quizDescription || isPublished==null){
            console.log("empty field detected")
            return res.status(400).json({msg: "required field can't be empty"})
        }
    
        let result = await quizMysql.createQuiz(userId, quizName, quizCatgeory, quizDescription, isPublished)

        res.status(201).json(result)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuestion = async (req,res)=>{
    try{
        let id = req.params.id;
        let questionResult = await quizMysql.getQuestion(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuestionChoice = async (req,res)=>{
    try{
        let id = req.params.id;
        let questionResult = await quizMysql.getQuestionChoice(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


module.exports = {
    getQuiz,
    getQuestion,
    getQuestionChoice,
    createQuiz
}