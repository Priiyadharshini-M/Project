const express = require('express')
const { viewCamps, viewCamp, addCamp, deleteCamp, updateCamp } = require('../controllers/CampController')
const campRouter = express.Router()
campRouter.get('/',viewCamps)
campRouter.get('/:id',viewCamp)
campRouter.post('/addCamp',addCamp)
campRouter.delete('/delete/:id',deleteCamp)
campRouter.put('/update/:id',updateCamp)
module.exports = { campRouter }