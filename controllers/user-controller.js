var admin = require('firebase-admin');
var client = require('firebase/auth')
var userMysql = require('../db/user-mysql');
const HEADER_CONSTANT = require('../constant/header')
const BODY = require("../constant/body");
const { default: axios } = require('axios');
const fs = require('fs')
const path = require('path');

/*************FOR TESTING PURPOSE/*************/
registerUser = async (req, res) => {
    const auth = client.getAuth();
    const email = req.body[BODY.EMAIL]
    const password = req.body[BODY.PASSWORD]

    //Move this to the front end?
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
    try{
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
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserInfo = async (req, res)=>{
    try{
        let id = req.params.userId
        let result = await userMysql.getUserInfo(id)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


getMainLeaderboard = async (req,res) =>{
    try{
        let body = {
            [BODY.ROW]: req.query.row
        }
        let mainLeaderBoard = await userMysql.getTopUsers(body);
        res.status(200).json(mainLeaderBoard)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getChannelLeaderboard = async (req,res) =>{
    try{
       let body = {
           [BODY.OWNERID]: req.params.ownerId,
           [BODY.ROW]: req.query.row
       }
       let channelLeaderboard = await userMysql.getChannelLeaderboard(body);
       res.status(200).json(channelLeaderboard);
    
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserProfileImage = async (req, res)=>{
    try{
        let id = req.params.userId;
        let result = await userMysql.getUserProfileImage(id)
        //TODO: CHECK IF DIR IS EMPTY
        let dir = result[0][BODY.PROFILEIMAGE]
        if(dir==null){
            return res.send(null)
        }
        //TODO: CHECK IF EXTENTION IS CORRECT IMAGE FORMAT
        let extention = path.extname(dir).substring(1)
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

getUserBackgroundImage = async (req, res)=>{
    try{
        let id = req.params.userId;
        let result = await userMysql.getUserBackgroundImage(id)
        //TODO: CHECK IF DIR IS EMPTY
        let dir = result[0][BODY.BACKGROUNDIMAGE]
        if(dir==null){
            return res.send(null)
        }
        //TODO: CHECK IF EXTENTION IS CORRECT IMAGE FORMAT
        let extention = path.extname(dir).substring(1)
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

getUserDescription = async (req, res) => {
    try{
        let id = req.params.userId
        let result = await userMysql.getUserDescription(id)
        res.status(200).json(result[0]);
    }catch(e){

    }
}

setUserProfileImage = async (req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const profileImage = res.locals.file.path
        let response = await userMysql.setUserProfileImage(userId, profileImage)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


setUserBackgroundImage = async (req, res)=>{
    try {
        const userId = res.locals.decodedToken[BODY.UID]
        const backgroundImage = res.locals.file.path
        let response = await userMysql.setUserBackgroundImage(userId, backgroundImage)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

setUserDescription = async (req, res)=>{
    try {
        const userId = res.locals.decodedToken[BODY.UID]
        const description = req.body[BODY.USERDESCRIPTION]
        let response = await userMysql.setUserDescription(userId, description)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

}

setUserTopFeatureQuiz = async (req, res) => {
    try {
        const userId = res.locals.decodedToken[BODY.UID]
        const topFeatureQuiz = req.body[BODY.TOPFEATUREQUIZ]
        let response = await userMysql.setUserTopFeatureQuiz(userId, topFeatureQuiz)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

createSubscribe = async (req, res) => {
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const subscribeTo = req.body[BODY.SUBSCRIBETO]
        let response = await userMysql.createSubscribe(userId, subscribeTo)
        res.sendStatus(201)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

cancelSubscribe = async (req, res) => {
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const subscribeTo = req.body[BODY.SUBSCRIBETO]
        let response = await userMysql.cancelSubscribe(userId, subscribeTo)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getSubscriptions = async (req, res) => {
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let response = await userMysql.getSubscriptions(userId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserDisplayName = async (req,res)=>{
    try{
        const userId = req.params.userId
        let response = await userMysql.getUserDisplayName(userId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getFollowers = async (req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let row = req.query.row
        let body = {
            [BODY.UID]: userId,
            [BODY.ROW]: row
        }
        let resposne = await userMysql.getFollowers(body)
        res.status(200).json(resposne)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

updateUserExperience = async (req, res) => {
    try {
        const userId = req.body.userId;
        const experience = req.body.experience;
        let response = await userMysql.updateUserExperience(userId, experience);
        res.status(200).json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

updateUserDisplayName = async(req, res)=>{
    try {
        const userId = res.locals.decodedToken[BODY.UID];
        const displayName = req.body[BODY.DISPLAYNAME];
        await userMysql.updateUserDisplayName(userId, displayName)
        res.sendStatus(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

updateUserLevel = async(req, res)=>{
    const LEVELCUTOFF = require("../constant/levelPointsCutoff")
    try {
        const userId = res.locals.decodedToken[BODY.UID];
        const newLevel = req.body[BODY.USERLEVEL];          //Current Level
        const expNeeded = req.body[BODY.EXPNEEDED];         //new needed experience points
        const expGained = req.body[BODY.EXPGAINED];

        //if the user gains more experience than what is required to level up
        if(expNeeded - expGained <= 0){
            //Level up
            //calculate the new exp Needed
            let newExpNeeded = expNeeded - expGained;
            //Gets the data needed for the new level
            let levelObj = LEVELCUTOFF.LEVELS[newLevel + 1];   //level constant has a level 0 object. So level 1 corresponds to ARRAY[1]
            console.log("this level neeeded this amount of exp" + levelObj.experience);
            newExpNeeded = levelObj.experience + newExpNeeded; //new Exp Needed is a negative number

            //set the new values
            await userMysql.updateUserLevel(userId, newLevel + 1, newExpNeeded)
        }else{
            //same level
            //just new value for the exp needed
            await userMysql.updateUserLevel(userId, newLevel, expNeeded - expGained)
        }
        res.sendStatus(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

getMoreSubscriptionsById = async(req,res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const last_subscription_id = req.body[BODY.SUBSCRIBEID]
        let response = await userMysql.getMoreSubscriptionsById(userId, last_subscription_id)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createUserCategoryPreference = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const categoryList = req.body[BODY.CATEGORYLIST]
        if(categoryList.length>10){
            res.sendStatus(400)
        }
        await userMysql.removeUserCategoryPreference(userId)
        await userMysql.createUserCategoryPreference(userId, categoryList)
        res.sendStatus(201)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

obtainUserCategoryPreference = async(req, res)=>{
    try {
        const userId = res.locals.decodedToken[BODY.UID]
        let response = await userMysql.obtainUserCategoryPreference(userId)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}


checkSubscribeStatus = async(req, res)=>{
    try {
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.SUBSCRIBETO]: req.query.subscribeTo
        }
        let response = await userMysql.checkSubscribeStatus(body)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

updateChannelLeaderboard = async(req, res)=>{
    try {
        let body = {
            [BODY.USERID]: res.locals.decodedToken[BODY.UID],
            [BODY.CHANNELOWNER]: req.body[BODY.CHANNELOWNER],
            [BODY.SCORE]: req.body[BODY.SCORE]
        }
        let response = await userMysql.updateChannelLeaderboard(body)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

getGlobalLeaderboard = async(req, res)=>{
    try {
        let body = {
            [BODY.CATEGORY]: req.params.category,
            [BODY.ROW]: req.query.row
        }   
        let response = await userMysql.getGlobalLeaderboard(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


updateGlobalLeaderboard = async(req, res)=>{
    try {
        let body = {
            [BODY.USERID]: res.locals.decodedToken[BODY.UID],
            [BODY.CATEGORY]: req.body.category,
            [BODY.SCORE]: req.body.score
        }   
        let response = await userMysql.updateGlobalLeaderboard(body)
        res.sendStatus(200)
    }catch{
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    verifyUser,
    createUser,
    loginUser,
    registerUser,
    testVerify,
    getMainLeaderboard,
    getChannelLeaderboard,
    getUserProfileImage,
    getUserBackgroundImage,
    getUserDescription,
    setUserProfileImage,
    setUserBackgroundImage,
    setUserDescription,
    setUserTopFeatureQuiz,
    createSubscribe,
    cancelSubscribe,
    getSubscriptions,
    getUserInfo,
    getUserDisplayName,
    getFollowers,
    updateUserExperience,
    updateUserDisplayName,
    updateUserLevel,
    getMoreSubscriptionsById,
    createUserCategoryPreference,
    obtainUserCategoryPreference,
    checkSubscribeStatus,
    updateChannelLeaderboard,
    getGlobalLeaderboard,
    updateGlobalLeaderboard
}