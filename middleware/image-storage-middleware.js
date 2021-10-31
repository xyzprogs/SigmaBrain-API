
const multer = require('multer')
const config = require("../config")
const fs = require('fs')
const BODY = require('../constant/body')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("from destination ", req.body)
        const userId =  req.decodedToken[BODY.UID]
        const path = config.image_storage + userId + "/quizes/"
        console.log(path)
        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive:true})
        }
        console.log("path will be saved in " + path)
        cb(null, path)
    },
    filename: function(req, file, cb){
        const quizId = req.body.quizId
        const extension = file.mimetype.split('/')[1]
        cb(null, quizId+'.'+extension)
    }
})

const upload = multer({storage: storage}).single(BODY.QUIZTHUMBNAIL);

const uploadFile = async (req, res, next) => {
    upload(req, res, function(err){
        res.locals.file = req.file
        if(err){
            console.log("error here")
            return res.sendStatus(500);
        }
        next()
    })
}

const image_storage_api = {
    uploadFile: uploadFile
}

module.exports = image_storage_api
