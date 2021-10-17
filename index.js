const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
const config = require('./config')
const helmet = require("helmet");
const testRouter = require('./routes/test-router')

const PORT = 3000;

const app = express()

//Express Configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet());

//Routes Configuration
app.use('/api/test', testRouter)


app.listen(config.port, () => console.log(`App is listening at ${config.port}`))