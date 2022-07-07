const express = require('express')
const { viewCamps, viewCamp, addCamp, deleteCamp, updateCamp } = require('../controllers/CampController')
const { isAuthenticatedUser } = require('../helpers/auth')
const campRouter = express.Router()
campRouter.get('/',viewCamps)  //isAuthenticatedUser,donor
campRouter.get('/:id',viewCamp) //isAuthenticatedUser
campRouter.post('/addCamp',addCamp) //isAuthenticatedAdmin
campRouter.delete('/delete/:id',deleteCamp) //isAuthenticatedAdmin
campRouter.put('/update/:id',isAuthenticatedUser,updateCamp) //isAuthenticatedAdmin
module.exports = { campRouter }