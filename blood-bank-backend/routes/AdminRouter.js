const express = require('express')
const { loginAdmin, deleteAdminProfile } = require('../controllers/AdminController')
const { isAuthenticatedAdmin } = require('../helpers/auth')

const adminRouter = express.Router()
adminRouter.post('/login', loginAdmin) /**To login with email and password */
adminRouter.delete('/:adminId', isAuthenticatedAdmin, deleteAdminProfile) /**To delete a particular profile */

module.exports = adminRouter