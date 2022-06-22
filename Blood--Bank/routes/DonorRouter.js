const express = require('express')
const {viewDonors,viewDonor,addDonor, deleteDonor,updateDonor} = require('../queries/DonorController')
const donorRouter = express.Router()
donorRouter.get('/',viewDonors)
donorRouter.get('/:id',viewDonor)
donorRouter.post('/addDonor',addDonor)
donorRouter.delete('/delete/:id',deleteDonor)
donorRouter.update('/update/:id',updateDonor)
module.exports = donorRouter