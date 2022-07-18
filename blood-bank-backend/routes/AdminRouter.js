const express = require('express')
const { loginAdmin, deleteAdminProfile, viewAdminProfile, updateAdminProfile } = require('../controllers/AdminController')
const { isAuthenticatedAdmin } = require('../middleware/auth')

const adminRouter = express.Router()
adminRouter.post('/login', loginAdmin) //admin login with email and password
adminRouter.delete('/:adminId', isAuthenticatedAdmin, deleteAdminProfile) //delete admin profile
adminRouter.get('/:adminId', isAuthenticatedAdmin, viewAdminProfile) //view particular admin profile
adminRouter.put('/:adminId', isAuthenticatedAdmin, updateAdminProfile) //update admin profile
module.exports = { adminRouter }