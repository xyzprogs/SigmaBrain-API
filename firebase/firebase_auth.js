var admin = require('firebase-admin');
const HEADER_CONSTANT = require('../constant/header');


module.exports = (req, res, next) => {
    let token = req.headers[HEADER_CONSTANT.TOKEN]
    if(!token){
        return res.status(401).json({
            error: "Unauthorized Request"
        })
    }
    try {
        admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            res.locals.decodedToken = decodedToken; //pass the decoded token to next middleware
            req.decodedToken = decodedToken
            next();
        }).catch((error)=>{
            console.log(error)
            res.status(401).json({msg: error});
        })
    } catch (error) {
        res.status(500).json({
            "error": "server initialization fail"
        })
    }
}