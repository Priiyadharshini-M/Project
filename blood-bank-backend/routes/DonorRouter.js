const express = require('express')
const { viewDonors, viewDonor, addDonor, deleteDonor, updateDonor, viewSpecificDonors,loginDonor } = require('../controllers/DonorController')
const { isAuthenticatedUser } = require('../helpers/auth')
const donorRouter = express.Router()
donorRouter.get('/',isAuthenticatedUser,viewDonors)
donorRouter.get('/:id',viewDonor)
donorRouter.post('/addDonor',addDonor)
donorRouter.delete('/delete/:id',deleteDonor)
donorRouter.put('/update/:id',updateDonor)
donorRouter.get('/:bloodGroup/city',viewSpecificDonors)
donorRouter.post('/donorlogin',loginDonor)
module.exports = { donorRouter }