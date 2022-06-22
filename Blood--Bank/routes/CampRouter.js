const express = require('express')
const {viewCamps,viewCamp,addCamp, deleteCamp,updateCamp} = require('../queries/CampController')
const campRouter = express.Router()
campRouter.get('/',viewCamps)
campRouter.get('/:id',viewCamp)
campRouter.post('/addCamp',addCamp)
campRouter.delete('/delete/:id',deleteCamp)
campRouter.update('/update/:id',updateCamp)
module.exports = campRouter