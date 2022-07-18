const express = require('express')
const { viewDonors, viewDonor, addDonor, deleteDonor, updateDonor, viewSpecificDonors, loginDonor, donorCount } = require('../controllers/DonorController')
const { isAuthenticatedUser, isAuthenticatedDonor, isAuthenticatedAdmin } = require('../middleware/auth')
const donorRouter = express.Router()
donorRouter.get('/donorCount', donorCount) //number of donors registered
donorRouter.get('/', isAuthenticatedAdmin, viewDonors) //view all donors
donorRouter.get('/:id', viewDonor) //view particular donor
donorRouter.post('/addDonor', addDonor) //register for donor
donorRouter.delete('/delete/:id', isAuthenticatedDonor, isAuthenticatedAdmin, deleteDonor) //delete donor profile
donorRouter.put('/update/:id', isAuthenticatedDonor, updateDonor) //update donor profile
donorRouter.post('/specificDonor', isAuthenticatedUser, isAuthenticatedDonor, viewSpecificDonors) //filter donors
donorRouter.post('/donorlogin', loginDonor) //login donor
module.exports = { donorRouter }