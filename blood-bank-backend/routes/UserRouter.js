const express = require('express')
const { registerUser, viewProfile, updateProfile, deleteProfile, loginUser } = require('../controllers/UserController')
const { isAuthenticatedUser } = require('../helpers/auth')
const userRouter = express.Router()
userRouter.post('/',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/:id',viewProfile) //isAuthenticatedUser
userRouter.put('/:id',updateProfile)//isAuthenticatedUser
userRouter.delete('/delete/:id',isAuthenticatedUser,deleteProfile)
module.exports = { userRouter }