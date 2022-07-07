const express = require('express')
const { viewDonors, viewDonor, addDonor, deleteDonor, updateDonor, viewSpecificDonors,loginDonor } = require('../controllers/DonorController')
const { isAuthenticatedUser, isAuthenticatedDonor } = require('../helpers/auth')
const donorRouter = express.Router()
donorRouter.get('/',viewDonors)//isAuthenticatedUser
donorRouter.get('/:id',viewDonor) //isAuthenticatedDonor
donorRouter.post('/addDonor',addDonor)
donorRouter.delete('/delete/:id',deleteDonor) //isAuthenticatedDonor
donorRouter.put('/update/:id',updateDonor) //isAuthenticatedDonor
donorRouter.post('/specificDonor',viewSpecificDonors) //isAuthenticatedUser
donorRouter.post('/donorlogin',loginDonor) 
module.exports = { donorRouter }