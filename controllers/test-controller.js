var admin = require('firebase-admin');
const HEADER_CONSTANT = require('../constant/header')
testUser = async (req, res) => {
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
            res.sendStatus(200);
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

module.exports = {
    testUser
}