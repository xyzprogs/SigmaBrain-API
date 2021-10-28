
const HEADER = require('../../constant/header')
const auth = require('firebase/auth')
const axios = require('axios').default
require('../../firebase/firebase_init')
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
}

module.exports = testApi