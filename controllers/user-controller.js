var admin = require('firebase-admin');
const HEADER_CONSTANT = require('../constant/header')
verifyUser = async (req, res) => {
    console.log(req.headers)
    token = req.headers[HEADER_CONSTANT.TOKEN]
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


createUser = async (req, res) => {
    console.log(req.body)
    console.log(req.body[HEADER_CONSTANT.USERID])
    console.log(req.body[HEADER_CONSTANT.EMAIL])
    console.log(req.body[HEADER_CONSTANT.DISPLAYNAME])
    res.sendStatus(200)
}

module.exports = {
    verifyUser,
    createUser
}