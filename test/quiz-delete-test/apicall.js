const axios = require('axios').default
const auth = require('firebase/auth')
const HEADER = require('../../constant/header')
const BODY = require('../../constant/body')
require('../../firebase/firebase_init')

const testApi = {
    testDeleteQuizApi: async () => {
        const loginInfo = {
            "email": "test@mail.com",
            "password":"test123"
        }
        await auth.signInWithEmailAndPassword(auth.getAuth(), loginInfo.email, loginInfo.password)
            .then(data=>{
                // console.log(data)
            })
        const token = await auth.getAuth().currentUser.getIdToken()
        
        // console.log("after get id token " + token)
        token_name = HEADER.TOKEN;
        const headers = {
            [HEADER.TOKEN] : token
        }
        const quiz = {
            [BODY.QUIZNAME]: "testQuiz",
            [BODY.QUIZCATEGORY]: 1,
            [BODY.QUIZDESCRIPTION]: "This is the test quiz",
            [BODY.ISPUBLISHED]: 0
        }
        let response = await axios.post("http://localhost:3000/api/quiz/", quiz, {headers: headers})
        let last_insert = response.data.insertId
        return axios.delete("http://localhost:3000/api/quiz/"+last_insert, {headers: headers})
    },

    testDeleteQuizQuestionApi: async () => {
        const loginInfo = {
            "email": "test@mail.com",
            "password":"test123"
        }
        await auth.signInWithEmailAndPassword(auth.getAuth(), loginInfo.email, loginInfo.password)
            .then(data=>{
                // console.log(data)
            })
        const token = await auth.getAuth().currentUser.getIdToken()
        
        // console.log("after get id token " + token)
        token_name = HEADER.TOKEN;
        const headers = {
            [HEADER.TOKEN] : token
        }
        const quizQuestion = {
            [BODY.QUIZID]: 1,
            [BODY.QUESTIONTYPE]: 1,
            [BODY.NUMBEROFCHOICE]: 4,
            [BODY.QUESTION]: "what is the best team?"
        }
        const response = await axios.post("http://localhost:3000/api/quiz/"+quizQuestion.quizId+"/quizQuestion", quizQuestion, {headers: headers})
        let last_insert = response.data.insertId
        console.log(last_insert)
        return axios.delete("http://localhost:3000/api/quiz/quizQuestion/"+last_insert, {headers: headers})
    },

    testDeleteQuestionChoiceApi: async () => {
        const loginInfo = {
            "email": "test@mail.com",
            "password":"test123"
        }
        await auth.signInWithEmailAndPassword(auth.getAuth(), loginInfo.email, loginInfo.password)
            .then(data=>{
                // console.log(data)
            })
        const token = await auth.getAuth().currentUser.getIdToken()
        
        // console.log("after get id token " + token)
        token_name = HEADER.TOKEN;
        const headers = {
            [HEADER.TOKEN] : token
        }
        const quizQuestionChoice = {
            [BODY.QUESTIONID]: 1,
            [BODY.QUIZID]: 1,
            [BODY.ISRIGHTCHOICE]: 4,
            [BODY.CHOICE]: "kai?"
        }
        const response =  await axios.post("http://localhost:3000/api/quiz/"+quizQuestionChoice.quizId+"/question/"+quizQuestionChoice.questionId+"/quizQuestionChoice", quizQuestionChoice, {headers: headers})
        let last_insert = response.data.insertId
        console.log(last_insert)
        return axios.delete('http://localhost:3000/api/quiz/quizQuestion/'+last_insert, {headers: headers})
    }
}


module.exports = testApi