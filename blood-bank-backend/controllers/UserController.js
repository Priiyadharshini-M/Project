const User = require('../models/User')
const Joi = require('@hapi/joi')
const { userValidation } = require('../helpers/ValidationSchema')

const registerUser = async(req,res) => {
    let user
    try{
        const result = await userValidation.validateAsync(req.body,{abortEarly : false})
        user = await User.findOne({userEmail : result.userEmail})
        if(user) 
           throw "This mail id has already been registered"
        user = new User(result)
        await user.save()
        return res.status(201).json({message : "Succesfully registered",user})
    }
    catch(err) {
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            errors.push(error)
        })
        return res.status(400).json(errors)
        }
        return res.status(400).json({errorMessage : err})
    } 
        
}

const loginUser = async(req,res,next) => {
    let user
    try{
        // const loginResult = await loginValidationSchema.validateAsync(req.body,{abortEarly : false})
        user = await User.findOne({userEmail : req.body.userEmail})
        if(user == null) 
           throw "No account exists with this email id"
        if(! (user.userPassword === req.body.userPassword))
            throw "Password doesn't match"
        return res.status(201).json({message : "Succesfully logged in",user})
    }
    catch(err){
        return res.status(404).json({errorMessage : err})
    }
}


const viewProfile = async(req,res,next) => {
    let user
    try{
        user = await User.findById(req.params.id)
        return res.status(200).json({ user })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(404).json({ message : "No users found" })
}

const updateProfile = async(req,res) => {
    const{ userName, userEmail, userPassword, userContact, userAddress } = req.body
    let user
    try{
        user = await User.findByIdAndUpdate(req.params.id,{
            userName,
            userEmail,
            userPassword,
            userContact,
            userAddress
        })
        user = await user.save()
        return res.status(200).json({ message:"Successfully updated",user })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(400).json({ message:"Unable to update this id" }) 
}

const deleteProfile = async(req,res) => {
    let user
    try{
        user = await user.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message:"Deleted",user })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(400).json({ message : "Can't delete Profile",camps })
}
module.exports = { registerUser, viewProfile, updateProfile, deleteProfile, loginUser }