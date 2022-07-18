const express = require('express')
const { registerUser, viewProfile, updateProfile, deleteProfile, loginUser } = require('../controllers/UserController')
const { isAuthenticatedUser } = require('../middleware/auth')
const userRouter = express.Router()
userRouter.post('/', registerUser) //register user
userRouter.post('/login', loginUser) //login user
userRouter.get('/:id', isAuthenticatedUser, viewProfile) //view profile of user
userRouter.put('/:id', isAuthenticatedUser, updateProfile) //update profile of user
userRouter.delete('/delete/:id', isAuthenticatedUser, deleteProfile) //delete profile of user
module.exports = { userRouter }