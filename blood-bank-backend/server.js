const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = 3070

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const uri = process.env.DB_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
})
.then(() => console.log("Connection established"))
.catch((err) => console.log(err))

//importing router files
const { campRouter } = require('./routes/CampRouter')
const { userRouter } = require('./routes/UserRouter')
const { donorRouter } = require('./routes/DonorRouter')
//using router files
app.use('/camps',campRouter)
app.use('/users',userRouter)
app.use('/donors',donorRouter)

app.listen(port,()=>
{
    console.log(`Server running on port: ${port}`)
})