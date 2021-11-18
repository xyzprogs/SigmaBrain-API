const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
const config = require('./config')
const helmet = require("helmet");
const testRouter = require('./routes/test-router')
const quizRouter = require('./routes/quiz-router')
const userRouter = require('./routes/user-router')
const firebase_admin_app = require('firebase-admin/app')
const firebase_client = require('./firebase/firebase_init')
const firebase_admin = require("firebase-admin");
const cookieParser = require('cookie-parser')
const PORT = 3000;
const forumRouter = require('./routes/forumn-router')
const app = express()

//Express Configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet());
app.use(cookieParser())

//Routes Configuration
app.use('/api/test', testRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/user', userRouter)
app.use('/api/forumn', forumRouter)


//Firebase Admin Initialization
firebase_admin_app.initializeApp({
    credential: firebase_admin.credential.cert(config.firebase_admin_credentials)
});




app.listen(config.port, () => console.log(`App is listening at ${config.port}`))