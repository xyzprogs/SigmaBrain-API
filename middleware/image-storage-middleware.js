const multer = require('multer')
const config = require("../config")
const fs = require('fs')
const BODY = require('../constant/body')
//quiz thumbnail
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log(req)
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

//user profile image store
const background_img_storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log(req)
        const userId =  req.decodedToken[BODY.UID]
        const path = config.image_storage + userId + "/profile/"
        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive:true})
        }
        console.log("path will be saved in " + path)
        cb(null, path)
    },
    filename: function(req, file, cb){
        const name = req.body.imageType
        const extension = file.mimetype.split('/')[1]
        cb(null, name+'.'+extension)
    }
})
const upload_profile_image = multer({storage: background_img_storage}).single(BODY.USERPROFILE);
const uploadUserProfileFile = async (req, res, next) => {
    upload_profile_image(req, res, function(err){
        res.locals.file = req.file
        if(err){
            console.log(err)
            return res.sendStatus(500);
        }
        next()
    })
}


//profile image
const image_storage_api = {
    uploadFile: uploadFile,
    uploadUserProfileFile: uploadUserProfileFile
}


module.exports = image_storage_api
