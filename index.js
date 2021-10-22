const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
const config = require('./config')
const helmet = require("helmet");
const testRouter = require('./routes/test-router')
const quizRouter = require('./routes/quiz-router')
const userRouter = require('./routes/user-router')
const firebase_admin = require('firebase-admin/app')

const PORT = 3000;

const app = express()

//Express Configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet());

//Routes Configuration
app.use('/api/test', testRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/user', userRouter)

//Firebase Admin Initialization
firebase_admin.initializeApp({
    credential: firebase_admin.applicationDefault(),
});

app.listen(config.port, () => console.log(`App is listening at ${config.port}`))