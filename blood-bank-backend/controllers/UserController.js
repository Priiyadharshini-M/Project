const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const { userValidation } = require('../validation/ValidationSchema');
const { sendToken } = require('../util/JwtToken');

//register user
const registerUser = async (req, res) => {
    let user
    try {
        const result = await userValidation.validateAsync(req.body, { abortEarly: false })
        const { userName, userAddress, userContact, userPassword, userEmail } = result
        user = await User.findOne({ userEmail: result.userEmail })
        if (user)
            throw "This mail id has already been registered"
        const hashedPassword = await bcryptjs.hash(userPassword, 10)
        user = new User({
            userName,
            userAddress,
            userContact,
            userPassword: hashedPassword,
            userEmail
        })
        await user.save()
        return res.status(200).json({ user })
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            return res.status(400).json(errors)
        }
        return res.status(400).json({ errorMessage: err })
    }

}

//login user
const loginUser = async (req, res, next) => {
    let user
    try {
        user = await User.findOne({ userEmail: req.body.userEmail })
        if (user == null)
            throw "No account exists with this email id"
        if (!bcryptjs.compareSync(req.body.userPassword, user.userPassword))
            throw "Incorrect Password"
        const result = sendToken(user)
        return res.status(200).cookie("token", result.token, result).json({accessToken: result.token})
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}


//view particular user profile
const viewProfile = async (req, res, next) => {
    let user
    try {
        user = await User.findById(req.params.id)
        return res.status(200).json({ user })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}

//update user profile
const updateProfile = async (req, res) => {
    let user
    try {
        if (req.params.id.length == 24)
            user = await User.findById(req.params.id)
        else throw `Invalid Object Id`
        if (user != null) {
            const updateResult = await userValidation.validateAsync(req.body, { abortEarly: false })
            const { userName, userEmail, userPassword, userContact, userAddress } = updateResult
            const hashedPassword = await bcryptjs.hash(userPassword, 10)
            user = await User.findByIdAndUpdate(req.params.id, {
                userName,
                userEmail,
                userPassword: hashedPassword,
                userContact,
                userAddress
            })
            await user.save()
            return res.status(200).json({ message: "Successfully updated", user })
        }
    }
    catch (err) {
        if (err.isJoi === true) {
            const errors = []
            err.details.forEach(detail => {
                let error = {
                    [detail.path]: detail.message
                }
                errors.push(error)
            })
            if (err) return res.status(400).json(errors)
        }
        return res.status(400).json({ errorMessage: err })
    }
}

//delete user profile
const deleteProfile = async (req, res) => {
    let user
    try {
        if (req.params.id.length == 24) {
            throw "Invalid object Id."
        }
        user = await User.findByIdAndDelete(req.params.id)
        if (user == null) {
            throw "Unable to delete this id."
        }
        return res.status(200).json({ message: "Deleted", user })
    }
    catch (err) {
        return res.status(404).json({ errorMessage: err })
    }
}
module.exports = { registerUser, viewProfile, updateProfile, deleteProfile, loginUser }