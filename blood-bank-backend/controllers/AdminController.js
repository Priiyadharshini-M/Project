const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')
const { adminValidation } = require('../validation/ValidationSchema')
const { sendToken } = require('../util/JwtToken')
require('dotenv').config()

//login admin
const loginAdmin = async (req, res) => {
    let admin
    const { adminEmail, adminPassword } = req.body

    try {
        let options = { abortEarly: false }
        const loginResult = await adminValidation.validateAsync({ adminEmail, adminPassword }, options)
        admin = await Admin.findOne({ adminEmail: loginResult.adminEmail })
        if (admin === null)
            throw "No account exists with this email id"
        if (!loginResult.adminPassword === admin.adminPassword)
            throw "Password doesn't match"
        const result = sendToken(admin)
        return res.status(200).cookie("adminToken", result.token, result).json({accessToken: result.token})
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//delete admin profile
const deleteAdminProfile = async (req, res) => {
    let admin
    let adminId = req.params.adminId
    try {
        if (adminId.length == 24)
            admin = await Admin.findByIdAndDelete(adminId)
        else throw `Invalid Object Id`
        if (admin != null)
            return res.status(200).json({ message: "Succesfully deleted" })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
    return res.status(404).json({ error: "Unable to delete this id" })
}

//view admin profile
const viewAdminProfile = async (req, res) => {
    let admin
    let adminId = req.params.adminId

    try {
        if (adminId.length !== 24)
            throw "Invalid Object Id"
        admin = await Admin.findById(adminId)
        if (admin === null)
            throw "No admin found with the id mentioned"
        return res.status(200).json({ admin })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//update admin existing profile details
const updateAdminProfile = async (req, res) => {

    let admin
    let adminId = req.params.adminId
    try {
        if (adminId.length !== 24)
            throw "Invalid Object Id"
        admin = await Admin.findById(adminId)
        if (admin === null)
            throw "Unable to update this profile"
        let options = { abortEarly: false }
        const updateResult = await adminValidation.validateAsync(req.body, options)
        const { adminName, adminEmail, adminPassword } = updateResult
        const hashedPassword = await bcrypt.hash(adminPassword, 10)
        admin = await Admin.findByIdAndUpdate(adminId, {
            adminName,
            adminEmail,
            adminPassword: hashedPassword
        })
        await admin.save()
        return res.status(200).json({ message: "Successfully updated" })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

module.exports = { loginAdmin, deleteAdminProfile, viewAdminProfile, updateAdminProfile }