var quizMysql = require('../db/quiz-mysql');
const BODY = require('../constant/body');
const { json } = require('express');
const fs = require('fs')

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

setQuizWithThumbnail = async (req, res) => {
    try{
        console.log("from setQuizWithThumbnail ", req.body)
        const quizId = req.body.quizId
        const thumbnail = req.file.path
        /* if any of the required paramters is empty, return error */
        if(quizId==null || thumbnail==null){
            return res.status(400).json({msg: "some field is empty"})
        }
    
        let result = await quizMysql.setQuizThumbnail(quizId, thumbnail)

        res.status(201).json(result)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


deleteQuiz = async (req, res) => {
    try{
        let id = req.params.quizId;
        let result = await quizMysql.deleteQuiz(id)
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


//quiz image route
// file is  {
//     fieldname: 'quizImage',
//     originalname: 'spirit.jpeg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: '/Users/kaichen/Desktop/Fall2021/CSE416/image-storage/d3pyNcmIwPPTVFnAEowHIWagfgX2/quizes/1',
//     filename: 'quizImage',
//     path: '/Users/kaichen/Desktop/Fall2021/CSE416/image-storage/d3pyNcmIwPPTVFnAEowHIWagfgX2/quizes/1/quizImage',
//     size: 25057
// }
quizImage = async (req, res) => {
    console.log("file is ", req.file.path)
    console.log("res from quizImage ", req.body.id)
    res.sendStatus(200)
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

deleteQuestion = async (req, res) => {
    try{
        let id = req.params.questionId;
        let result = await quizMysql.deleteQuestion(id)
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteAllQuestionInQuiz = async (req, res) => {
    try{
        let id = req.params.quizId
        let result = await quizMysql.deleteAllQuestionInQuiz(id)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuestionChoice = async (req,res)=>{
    try{
        let id = req.params.choiceId;
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
        //TODO: CHECK
        let result = await quizMysql.createQuestionChoice(questionId, quizId, is_right_choice, choice)

        res.status(201).json(result)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteQuestionChoice = async (req, res)=>{
    try{
        let id = req.params.choiceId;
        let questionResult = await quizMysql.deleteQuestionChoice(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


deleteAllQuestionChoiceInQuiz = async (req, res)=>{
    try{
        let id = req.params.quizId;
        let questionResult = await quizMysql.deleteAllQuestionChoiceInQuiz(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


getTheMostPopularQuiz = async (req, res)=>{
    console.log("calling popular quiz")
    try{
        let result = await quizMysql.getTheMostPopularQuiz(1)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizThumbnail = async (req, res)=>{
    try{
        let id = req.params.quizId;
        let result = await quizMysql.getQuizThumbnail(id)
        console.log("calling thumbnail")
        fs.readFile(
            result[0]['thumbnail'], 'base64',
            (err, base64image)=>{
                const dataUrl = `data:image/jpeg;base64,${base64image}`
                return res.send(dataUrl)
            }
        )
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
    createQuestionChoice,
    deleteQuiz,
    deleteQuestion,
    deleteAllQuestionInQuiz,
    deleteQuestionChoice,
    deleteAllQuestionChoiceInQuiz,
    setQuizWithThumbnail,
    getTheMostPopularQuiz,
    getQuizThumbnail
}