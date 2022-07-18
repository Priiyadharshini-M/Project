const express = require('express')
const { viewCamps, viewCamp, addCamp, deleteCamp, updateCamp } = require('../controllers/CampController')
const { isAuthenticatedUser, isAuthenticatedDonor, isAuthenticatedAdmin } = require('../middleware/auth')
const campRouter = express.Router()
campRouter.get('/', viewCamps) //view all camps
campRouter.get('/:id', isAuthenticatedAdmin, viewCamp) //view particular camp
campRouter.post('/addCamp', isAuthenticatedAdmin, addCamp) //add camp
campRouter.delete('/delete/:id', isAuthenticatedAdmin, deleteCamp) //delete camp
campRouter.put('/update/:id', isAuthenticatedAdmin, updateCamp) //update camp
module.exports = { campRouter }