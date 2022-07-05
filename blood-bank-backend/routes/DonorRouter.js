const express = require('express')
const { viewDonors, viewDonor, addDonor, deleteDonor, updateDonor, viewSpecificDonors,loginDonor } = require('../controllers/DonorController')
const { isAuthenticatedUser, isAuthenticatedDonor } = require('../helpers/auth')
const donorRouter = express.Router()
donorRouter.get('/',isAuthenticatedUser,viewDonors)
donorRouter.get('/:id',viewDonor) //isAuthenticatedDonor
donorRouter.post('/addDonor',addDonor)
donorRouter.delete('/delete/:id',deleteDonor) //isAuthenticatedDonor
donorRouter.put('/update/:id',updateDonor) //isAuthenticatedDonor
donorRouter.get('/:bloodGroup/:city',viewSpecificDonors) //isAuthenticatedUser
donorRouter.post('/donorlogin',loginDonor) 
module.exports = { donorRouter }