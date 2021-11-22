var quizMysql = require('../db/quiz-mysql');
const BODY = require('../constant/body');
const MYSQL_CONSTANT = require('../constant/mysql')
const fs = require('fs')
const path = require('path');

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

getUserQuiz = async (req, res)=>{
    try{
        let userId = req.params.userId
        let result = await quizMysql.getUserQuiz(userId)
        res.status(200).json(result)
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


createQuizWithQuestions = async (req, res) => {
    try{
        console.log("createQuizWithQuestions")
        const userId = res.locals.decodedToken[BODY.UID]
        const quizName = req.body[BODY.QUIZNAME]
        const quizCatgeory = req.body[BODY.QUIZCATEGORY]
        const quizDescription = req.body[BODY.QUIZDESCRIPTION]
        const isPublished = req.body[BODY.ISPUBLISHED]
        if(userId==null || quizName==null || quizCatgeory==null || quizDescription==null || isPublished==null){
            return res.status(400).json({msg: "required field can't be empty"})
        }
        console.log("quiz", quizName, quizCatgeory,quizDescription, isPublished)
        let quiz_result = await quizMysql.createQuiz(userId, quizName, quizCatgeory, quizDescription, isPublished)
        const quizId = quiz_result[MYSQL_CONSTANT.INSERTID]
        const questions = req.body[BODY.QUESTIONS]
        for(var i = 0; i < questions.length; i++){
            const questionType = questions[i][BODY.QUESTIONTYPE]
            const numberOfChoice = questions[i][BODY.NUMBEROFCHOICE]
            const question = questions[i][BODY.QUESTION]
            console.log("question", questionType, numberOfChoice, question)
            let result = await quizMysql.createQuestion(quizId, questionType, numberOfChoice, question)
            const choices = questions[i][BODY.CHOICES]
            const questionId = result[MYSQL_CONSTANT.INSERTID]
            for(var j = 0; j < choices.length; j++){
                const is_right_choice = choices[j][BODY.ISRIGHTCHOICE]
                const choice = choices[j][BODY.CHOICE]
                console.log("choice", choice, is_right_choice)
                await quizMysql.createQuestionChoice(questionId, quizId, is_right_choice, choice)
            }
        }
        res.status(201).json(quiz_result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuizGrade = async (req, res) =>{
    try {
        const userId = res.locals.decodedToken[BODY.UID];
        const quizId = req.body.quizId;
        const quizGrade = req.body.quizGrade;
        let result = await quizMysql.createQuizGrade(quizId, userId, quizGrade);
        res.status(201).json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

setQuizWithThumbnail = async (req, res) => {
    try{
        console.log("from setQuizWithThumbnail ", req.body)
        const quizId = req.body.quizId
        const thumbnail = res.locals.file.path
        /* if any of the required paramters is empty, return error */
        if(quizId==null || thumbnail==null){
            return res.status(400).json({msg: "some field is empty"})
        }
    
        let result = await quizMysql.setQuizThumbnail(quizId, thumbnail)
        console.log("quiz thumbnial is set")
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

createMutipleQuestionChoice = async(req, res)=>{
    try{
        console.log(req.body)
        let choices = req.body
        let result = await quizMysql.createMutipleQuestionChoice(choices)
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
        let id = req.params.questionId;
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
        //TODO: CHECK IF DIR IS EMPTY
        let dir = result[0]['thumbnail']
        console.log(result)
        //TODO: CHECK IF EXTENTION IS CORRECT IMAGE FORMAT
        console.log(dir)
        let extention = path.extname(dir).substring(1)
        console.log("calling thumbnail")
        console.log("extention is", path.extname(dir).substring(1))
        fs.readFile(
            dir, 'base64',
            (err, base64image)=>{
                const dataUrl = `data:image/${extention};base64,${base64image}`
                return res.send(dataUrl)
            }
        )
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getCategoryQuiz = async (req, res)=>{
    try{
        let category = req.params.category
        let result = await quizMysql.getCategoryQuiz(category)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteQuizWithQuestions = async (req, res)=>{
    try{
        let results = []
        const userId = res.locals.decodedToken[BODY.UID]
        let id = req.params.quizId;
        let result = await quizMysql.deleteQuiz(id)
        results.push(result)
        result = await quizMysql.deleteAllQuestionInQuiz(id)
        results.push(result)
        result = await quizMysql.deleteAllQuestionChoiceInQuiz(id)
        results.push(result)
        res.status(200).json(results)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserTopFeatureQuiz = async (req, res)=>{
    try{
        let userId = req.params.userId
        let result = await quizMysql.getUserTopFeatureQuiz(userId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

setUserTopFeatureQuiz = async (req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const quizId = req.body[BODY.QUIZID]
        let result = await quizMysql.setUserTopFeatureQuiz(userId, quizId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

updateQuiz = async (req, res)=>{
    try {
        const userId = res.locals.decodedToken[BODY.UID]
        const quizId = req.body[BODY.QUIZID]
        const quizName = req.body[BODY.QUIZNAME]
        const quizDescription = req.body[BODY.QUIZDESCRIPTION]
        const timelimit = req.body[BODY.TIMELIMIT]
        const quizCategory = req.body[BODY.QUIZCATEGORY]
        let result = await quizMysql.updateQuiz(userId, quizId, quizName, quizDescription, timelimit, quizCategory)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

getChoicesInAQuestion = async (req, res)=>{
    try{
        let questionId = req.params.questionId
        let result = await quizMysql.getChoicesInAQuestion(questionId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getChoicesInAQuestionWithAnswer = async (req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let questionId = req.params.questionId
        let result = await quizMysql.getChoicesInAQuestionWithAnswer(questionId, userId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

updateQuestionChoices = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let choices = req.body[BODY.CHOICES]
        let quizId = req.body[BODY.QUIZID]
        let questionId = req.body[BODY.QUESTIONID]
        await quizMysql.removeChoicesInAQuestion(userId, questionId)
        let result = await quizMysql.updateQuestionChoices(choices, userId, quizId, questionId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


getTopQuizByCategory = async(req, res)=>{
    try{
        let category = req.params.category
        let response = await quizMysql.getTopQuizByCategory(category)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuizComment = async(req, res)=>{
    console.log("createing quiz comment")
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.body[BODY.QUIZID]
        let quizComment = req.body[BODY.QUIZCOMMENT]
        let response = await quizMysql.createQuizComment(quizId, quizComment, userId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
} 

getQuizComment =  async(req, res)=>{
    try{
        let quizId = req.params.quizId
        console.log("getting comment from quiz",quizId)
        let response = await quizMysql.getQuizComment(quizId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizSearchName = async(req, res)=>{
    try{
        let search = req.params.search
        let response= await quizMysql.getQuizSearchName(search)
        let search_arr = []
        for(var i=0; i < response.length; i++){
            search_arr.push(response[i][BODY.QUIZNAME])
        }
        res.status(200).json(search_arr)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getSearchQuiz = async(req, res)=>{
    try{
        let search = req.params.search
        let response = await quizMysql.getSearchQuiz(search)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


getTakeLater = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let response = await quizMysql.getTakeLater(userId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getLikedQuiz = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        console.log(`get take later from ${userId}`)
        let response = await quizMysql.getLikedQuiz(userId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createTakeLater = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.body[BODY.QUIZID]
        let response = await quizMysql.createTakeLater(userId, quizId)
        res.status(201).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createLikedQuiz = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.body[BODY.QUIZID]
        let response = await quizMysql.createLikedQuiz(userId, quizId)
        res.status(201).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteTakeLater = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.params.quizId
        let response = await quizMysql.deleteTakeLater(userId, quizId)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteLikedQuiz = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.params.quizId
        let response = await quizMysql.deleteLikedQuiz(userId, quizId)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    getQuiz,
    getQuestion,
    getQuestionChoice,
    getCategoryQuiz,
    getUserQuiz,
    createQuiz,
    createQuestion,
    createQuestionChoice,
    createMutipleQuestionChoice,
    createQuizGrade,
    deleteQuiz,
    deleteQuestion,
    deleteAllQuestionInQuiz,
    deleteQuestionChoice,
    deleteAllQuestionChoiceInQuiz,
    setQuizWithThumbnail,
    getTheMostPopularQuiz,
    getQuizThumbnail,
    createQuizWithQuestions,
    deleteQuizWithQuestions,
    getUserTopFeatureQuiz,
    setUserTopFeatureQuiz,
    updateQuiz,
    getChoicesInAQuestion,
    getChoicesInAQuestionWithAnswer,
    updateQuestionChoices,
    getTopQuizByCategory,
    createQuizComment,
    getQuizComment,
    getQuizSearchName,
    getSearchQuiz,
    getTakeLater,
    getLikedQuiz,
    createTakeLater,
    createLikedQuiz,
    deleteTakeLater,
    deleteLikedQuiz
}