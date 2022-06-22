const express = require('express')
const {registerUser,viewProfile,updateProfile,deleteProfile} = require('../queries/UserController')
const userRouter = express.Router()
userRouter.post('/register',registerUser)
userRouter.get('/:id',viewProfile)
userRouter.put('/update/:id',updateProfile)
userRouter.delete('/delete/:id',deleteProfile)
module.exports = userRouter