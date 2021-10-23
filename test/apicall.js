const userRouter = require('../routes/user-router')
const axios = require('axios').default
const client = require('../firebase/firebase_init')
const auth = require('firebase/auth')
const HEADER = require('../constant/header')
const testApi = {
    testVerifyApiCall: ()=>{
        const loginInfo = {
            "email": "test@mail.com",
            "password":"test123"
        }
        await auth.signInWithEmailAndPassword(auth.getAuth(), loginInfo.email, loginInfo.password)
            .then(data=>{
                console.log(data)
            })
        const token = await auth.getIdToken()
            .then(data=>{
                console.log(token)
            })
        
        console.log("after get id token " + token)
        token_name = HEADER.TOKEN;
        return axios.get("http://localhost:3000/api/user/verify", {'header': {token_name: token}})
            .then(res => res.data)
            .catch(err => "error")
    }
}


module.exports = testApi

