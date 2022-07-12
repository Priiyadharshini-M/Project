const express = require('express')
const { viewDonors, viewDonor, addDonor, deleteDonor, updateDonor, viewSpecificDonors, loginDonor } = require('../controllers/DonorController')
const { isAuthenticatedUser, isAuthenticatedDonor } = require('../middleware/auth')
const donorRouter = express.Router()
donorRouter.get('/', viewDonors)//isAuthenticatedUser
donorRouter.get('/:id', isAuthenticatedDonor, viewDonor) //isAuthenticatedDonor
donorRouter.post('/addDonor', addDonor)
donorRouter.delete('/delete/:id', isAuthenticatedDonor, deleteDonor) //isAuthenticatedDonor
donorRouter.put('/update/:id', isAuthenticatedDonor, updateDonor) //isAuthenticatedDonor
donorRouter.post('/specificDonor', isAuthenticatedUser, isAuthenticatedDonor, viewSpecificDonors) //isAuthenticatedUser
donorRouter.post('/donorlogin', loginDonor)
module.exports = { donorRouter }