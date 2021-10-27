var admin = require('firebase-admin');
var quizMysql = require('../db/quiz-mysql');
const HEADER_CONSTANT = require('../constant/header');
const BODY = require('../constant/body');
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
        let id = req.params.quizId;
        let result = await quizMysql.getQuiz(id);
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuiz = async (req, res) => {
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const quizName = req.body[BODY.QUIZNAME]
        const quizCatgeory = req.body[BODY.QUIZCATEGORY]
        const quizDescription = req.body[BODY.QUIZDESCRIPTION]
        const isPublished = req.body[BODY.ISPUBLISHED]
        /* if any of the required paramters is empty, return error */
        if(userId==null || quizName==null || quizCatgeory==null || quizDescription==null || isPublished==null){
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
        let id = req.params.quizId;
        let questionResult = await quizMysql.getQuestion(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuestion = async (req, res)=>{
    try{
        //INSERT INTO Question(quizId, questionType, numberOfChoice, question)
        const quizId = req.params.quizId
        const questionType = req.body[BODY.QUESTIONTYPE]
        const numberOfChoice = req.body[BODY.NUMBEROFCHOICE]
        const question = req.body[BODY.QUESTION]

        //check if fields are empty
        if(quizId==null || questionType==null || numberOfChoice==null || question==null){
            return res.status(400).json({msg: "required field can't be empty"})
        }

        let result = await quizMysql.createQuestion(quizId, questionType, numberOfChoice, question)

        res.status(201).json(result)


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

createQuestionChoice = async (req, res)=>{
    try{
        const quizId = req.params.quizId
        const questionId = req.params.questionId
        const is_right_choice = req.body[BODY.ISRIGHTCHOICE]
        const choice = req.body[BODY.CHOICE]

        let result = await quizMysql.createQuestionChoice(questionId, quizId, is_right_choice, choice)

        res.status(201).json(result)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


module.exports = {
    getQuiz,
    getQuestion,
    getQuestionChoice,
    createQuiz,
    createQuestion,
    createQuestionChoice
}