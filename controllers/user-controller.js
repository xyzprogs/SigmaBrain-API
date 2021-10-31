var admin = require('firebase-admin');
var client = require('firebase/auth')
var userMysql = require('../db/user-mysql');
const HEADER_CONSTANT = require('../constant/header')
const BODY = require("../constant/body");
const { default: axios } = require('axios');

/*************FOR TESTING PURPOSE/*************/
registerUser = async (req, res) => {
    const auth = client.getAuth();
    const email = req.body[BODY.EMAIL]
    const password = req.body[BODY.PASSWORD]
    if(!email || !password){
        return res.status(200).json({msg: "email or password can't be empty"})
    }
    try{
        client.createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                const uid = user[BODY.UID]
                const payload = {
                    uid: uid,
                    email: email,
                    displayName: "testing"
                }
                const token = await user.getIdToken();
                await axios.post("http://localhost:3000/api/user/create", payload, {headers: {
                    "sigma-brain-token" : token
                }}).then(
                    (data)=>{console.log(data)}
                ).catch(e=>{
                    return res.status(400).json({
                        error: e
                    })
                })
                return res.status(200).json({user: user})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                return res.status(400).json({
                    errorCode: errorCode,
                    errorMessage: errorMessage
                })
        });
    }catch(e){
        return res.status(500).json({msg: e})
    }
}

loginUser = async (req, res) => {
    const auth = client.getAuth();
    const email = req.body[BODY.EMAIL]
    const password = req.body[BODY.PASSWORD]
    if(!email || !password){
        return res.status(400).json({msg: "email or password can't be empty"})
    }
    try{
        client.signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                return res.status(200).json({user: user})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                return res.status(400).json({
                    errorCode: errorCode,
                    errorMessage: errorMessage
                })
        });
    }catch(e){
        return res.status(500).json({msg: "server initialization failed"})
    }
}

testVerify = async (req, res) => {
    let token = null
    try{
        token = await client.getAuth().currentUser.getIdToken()
    }catch(e){
        return res.status(400).json({
            msg: "current user is null"
        })
    }
    
    if(!token){
        return res.status(401).json({
            error: "NO TOKEN FOUND"
        })
    }
    try {
        admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            console.log("decoded token: " + decodedToken)
            res.json(decodedToken).sendStatus(200);
        }).catch((error)=>{
            console.log("error " + error)
            res.sendStatus(400);
        })
    } catch (error) {
        res.status(500).json({
            "error": "server initialization fail"
        })
    }
}
/*************FOR TESTING PURPOSE/*************/

verifyUser = async (req, res) => {
    const token = res.locals.decodedToken
    console.log(token)
    res.sendStatus(200)
}

createUser = async (req, res) => {
    const user = {
        userId: res.locals.decodedToken[BODY.UID],
        email: req.body[BODY.EMAIL],
        displayName: req.body[BODY.DISPLAYNAME]
    }
    userMysql.createUser(user).then(
        (data) => {
            console.log("insert id is " +  data["insertId"])
            res.status(200).json({msg: data})
        }).catch((error)=>{
            res.status(400).json({msg: error})
        })
}

module.exports = {
    verifyUser,
    createUser,
    loginUser,
    registerUser,
    testVerify
}