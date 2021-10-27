const userRouter = require('../routes/user-router')
const axios = require('axios').default
const client = require('../firebase/firebase_init')
const auth = require('firebase/auth')
const HEADER = require('../constant/header')
const BODY = require('../constant/body')
const testApi = {
    testVerifyApiCall: async ()=>{
        const loginInfo = {
            "email": "test@mail.com",
            "password":"test123"
        }
        await auth.signInWithEmailAndPassword(auth.getAuth(), loginInfo.email, loginInfo.password)
            .then(data=>{
                // console.log(data)
            })
        const token = await auth.getAuth().currentUser.getIdToken()
        
        console.log("after get id token " + token)
        const headers = {
            [HEADER.TOKEN]: token
        }
        return axios.get("http://localhost:3000/api/user/verify", {headers: headers})
    },

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
        return axios.post("http://localhost:3000/api/quiz/", quiz, {headers: headers})
    }
}


module.exports = testApi
