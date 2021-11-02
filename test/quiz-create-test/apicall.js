const axios = require('axios').default
const auth = require('firebase/auth')
const HEADER = require('../../constant/header')
const BODY = require('../../constant/body')
const FormData = require('form-data')
const fs = require('fs')

require('../../firebase/firebase_init')
const testApi = {
    testCreateQuizApi: async ()=>{
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
        // token_name = HEADER.TOKEN;
        const headers = {
            [HEADER.TOKEN] : token
        }
        const quiz = {
            [BODY.QUIZNAME]: "testQuiz",
            [BODY.QUIZCATEGORY]: 1,
            [BODY.QUIZDESCRIPTION]: "This is the test quiz",
            [BODY.ISPUBLISHED]: 0
        }
        return axios.post("http://localhost:3000/api/quiz/", quiz, {headers: headers})
    },

    testCreateQuizQuestionApi: async ()=>{
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
        return axios.post("http://localhost:3000/api/quiz/"+quizQuestion.quizId+"/quizQuestion", quizQuestion, {headers: headers})
    },

    testCreateQuizQuestionChoiceApi: async ()=>{
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
        return axios.post("http://localhost:3000/api/quiz/"+quizQuestionChoice.quizId+"/question/"+quizQuestionChoice.questionId+"/quizQuestionChoice", quizQuestionChoice, {headers: headers})
    },

    // testCreateQuizWithThumbnailApi: async ()=> {
    //     const loginInfo = {
    //         "email": "test@mail.com",
    //         "password":"test123"
    //     }
    //     await auth.signInWithEmailAndPassword(auth.getAuth(), loginInfo.email, loginInfo.password)
    //         .then(data=>{
    //             // console.log(data)
    //         })
    //     const token = await auth.getAuth().currentUser.getIdToken()
        
    //     // console.log("after get id token " + token)
    //     token_name = HEADER.TOKEN;
    //     // const quizName = req.body.quizName
    //     // const quizCatgeory = req.body.quizCatgeory
    //     // const quizDescription = req.body.quizDescription
    //     // const isPublished = req.body.isPublished
    //     const formdata = new FormData()
    //     formdata.append(BODY.QUIZTHU, fs.createReadStream('/Users/kaichen/Desktop/Fall2021/CSE416/imagedemo/spirit.jpeg'))
    //     formdata.append(BODY.QUIZNAME, 'test')
    //     formdata.append(BODY.QUIZCATEGORY, 1)
    //     formdata.append(BODY.QUIZDESCRIPTION, 'test')
    //     formdata.append(BODY.ISPUBLISHED, 0)
    //     const headers = {
    //         [HEADER.TOKEN] : token,
    //         [HEADER.CONTENTTYPE] : `${HEADER.MULT_FORMDATA}; boundary=${formdata.getBoundary()}`,
    //         [HEADER.ACCEPT] : HEADER.APPLICATION_JSON
    //     }

    //     return axios.post("http://localhost:3000/api/quiz/quizImage/1", formdata, {headers: headers})
    // },

    testCreateQuizWithThumbnailApi: async (quizName, quizCatgeory, img)=> {
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
        const quiz = {
            [BODY.QUIZNAME]: quizName,
            [BODY.QUIZCATEGORY]: quizCatgeory,
            [BODY.QUIZDESCRIPTION]: "This is the biology test",
            [BODY.ISPUBLISHED]: 0
        }
        const headers = {
            [HEADER.TOKEN] : token
        }
        let response = await axios.post("http://localhost:3000/api/quiz/", quiz, {headers: headers})
        let quizId = response.data.insertId
        console.log("new test created " + quizId)
        const formdata = new FormData()
        formdata.append(BODY.QUIZID, quizId)
        formdata.append(BODY.QUIZTHUMBNAIL, fs.createReadStream(`/Users/kaichen/Desktop/Fall2021/CSE416/imagedemo/${img}`))
        
        const headers2 = {
            [HEADER.TOKEN] : token,
            [HEADER.CONTENTTYPE] : `${HEADER.MULT_FORMDATA}; boundary=${formdata.getBoundary()}`,
            [HEADER.ACCEPT] : HEADER.APPLICATION_JSON
        }
        return axios.post("http://localhost:3000/api/quiz/quizThumbnail/"+{quizId}, formdata, {headers: headers2})
    },


    // testCreateMultipleQuestionChoicesApi: async (choices)=>{
    //     const loginInfo = {
    //         "email": "test@mail.com",
    //         "password":"test123"
    //     }
    //     await auth.signInWithEmailAndPassword(auth.getAuth(), loginInfo.email, loginInfo.password)
    //         .then(data=>{
    //             // console.log(data)
    //         })
    //     const token = await auth.getAuth().currentUser.getIdToken()
        
    //     // console.log("after get id token " + token)
    //     const headers = {
    //         [HEADER.TOKEN] : token
    //     }
    //     return axios.post("http://localhost:3000/api/quiz/1/multipleQuizQuestionChoice", choices, {headers: headers})
    // }
}


module.exports = testApi