const express = require('express')
const { viewCamps, viewCamp, addCamp, deleteCamp, updateCamp } = require('../controllers/CampController')
const { isAuthenticatedUser, isAuthenticatedDonor, isAuthenticatedAdmin } = require('../middleware/auth')
const campRouter = express.Router()
campRouter.get('/', viewCamps)  //isAuthenticatedUser,donor,admin
campRouter.get('/:id', viewCamp) //isAuthenticatedUser
campRouter.post('/addCamp', isAuthenticatedAdmin, addCamp) //isAuthenticatedAdmin
campRouter.delete('/delete/:id', isAuthenticatedAdmin, deleteCamp) //isAuthenticatedAdmin
campRouter.put('/update/:id', isAuthenticatedAdmin, updateCamp) //isAuthenticatedAdmin
module.exports = { campRouter }