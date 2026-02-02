const express = require('express')
const cors=require('cors')
const app = express()
require('dotenv').config();
app.use(express.json())
app.use('/uploads',express.static('uploads'))
const userRoutes = require('./routes/signuproute')
const addRoutes=require('./routes/addRoute')
const connectiondb = require('./config/db')
app.use(cors({
    origin:'*'

}))
connectiondb()
console.log(process.env.EMAIL_USER)
app.use('/teacher', userRoutes) 
app.use('/student', addRoutes) 
app.listen(4000, () => {
    console.log('server is connected')
})
