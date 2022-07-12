const express = require('express')
const { registerUser, viewProfile, updateProfile, deleteProfile, loginUser } = require('../controllers/UserController')
const { isAuthenticatedUser } = require('../middleware/auth')
const userRouter = express.Router()
userRouter.post('/', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/:id', isAuthenticatedUser, viewProfile) //isAuthenticatedUser
userRouter.put('/:id', isAuthenticatedUser, updateProfile)//isAuthenticatedUser
userRouter.delete('/delete/:id', isAuthenticatedUser, deleteProfile)
module.exports = { userRouter }