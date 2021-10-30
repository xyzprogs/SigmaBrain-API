
const multer = require('multer')
const config = require("../config")
const fs = require('fs')
const BODY = require('../constant/body')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("from destination ", req.body)
        const userId =  req.decodedToken[BODY.UID]
        const quizId = req.body.quizId
        const path = config.image_storage + userId + "/quizes/" + quizId
        console.log(path)
        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive:true})
        }
        console.log("path will be saved in " + path)
        cb(null, path)
    },
    filename: function(req, file, cb){
        const extension = file.mimetype.split('/')[1]
        cb(null, file.fieldname+'.'+extension)
    }
})


const image_storage_api = {
    createImagePath: async (req, res, next) => {
        try{
            console.log(req.body)
            const userId =  res.locals.decodedToken[BODY.UID]
            const quizId = req.body.quizId
            const path = config.image_storage + userId + "/quizes/" + quizId
            if(!fs.existsSync(path)){
                fs.mkdirSync(path, {recursive:true})
            }
        }catch(e){
            console.log(e)
            res.sendStatus(500)
        }
    },

    upload: multer({ storage: storage }) 
}

module.exports = image_storage_api
