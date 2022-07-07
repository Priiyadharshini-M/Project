const express = require('express')
const { loginAdmin, deleteAdminProfile, viewAdminProfile, updateAdminProfile } = require('../controllers/AdminController')
const { isAuthenticatedAdmin } = require('../helpers/auth')

const adminRouter = express.Router()
adminRouter.post('/login', loginAdmin) /**To login with email and password */
adminRouter.delete('/:adminId', isAuthenticatedAdmin, deleteAdminProfile) /**To delete a particular profile */
adminRouter.get('/:adminId',viewAdminProfile) //isAuthenticatedAdmin
adminRouter.put('/:adminId',updateAdminProfile) //isAuthenticatedAdmin

module.exports = { adminRouter }