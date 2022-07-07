const User = require('../models/User')
//const Joi = require('@hapi/joi')
const bcryptjs = require('bcryptjs');
const { userValidation } = require('../helpers/ValidationSchema');
const { sendToken } = require('../util/JwtToken');

const registerUser = async(req,res) => {
    let user
    try{
        const result = await userValidation.validateAsync(req.body,{abortEarly : false})
        console.log("user controller",result)
        const { userName, userAddress, userContact, userPassword, userEmail } = result
        user = await User.findOne({userEmail : result.userEmail})
        if(user) 
           throw "This mail id has already been registered"
        const hashedPassword = await bcryptjs.hash(userPassword, 10)
        user = new User({
            userName, 
            userAddress, 
            userContact, 
            userPassword : hashedPassword, 
            userEmail
        })
        await user.save()
        sendToken(user,201,res)
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
        //console.log(user.userPassword+" "+req.body.userPassword)
        if(!bcryptjs.compareSync(req.body.userPassword,user.userPassword))
            throw "Incorrect Password"
        sendToken(user,201,res)
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
    let user
    console.log("req body : ",req.body)
    try{
        if(req.params.id.length == 24)
        user = await User.findById(req.params.id)
        else throw `Invalid Object Id`
        if(user != null)
        {
        // let options = {abortEarly : false}
        const updateResult = await userValidation.validateAsync(req.body,{abortEarly : false})
        console.log("updated",updateResult)
        const { userName, userEmail, userPassword, userContact, userAddress } = updateResult
        const hashedPassword = await bcryptjs.hash(userPassword,10) 
        user = await User.findByIdAndUpdate(req.params.id,{
            userName,
            userEmail,
            userPassword : hashedPassword,
            userContact,
            userAddress
        })
        await user.save()
        return res.status(200).json({message:"Successfully updated",user})
        }
    }
    catch(err) {
        if(err.isJoi === true)
        {
            const errors = []
            err.details.forEach(detail => {
            let error = {
                [detail.path] : detail.message
            }
            console.log(error)
            errors.push(error)
        })
        if(err) return res.status(400).json(errors)
        }
        return res.status(400).json({errorMessage : err})
    } 
}

const deleteProfile = async(req,res) => {
    let user
    try{
        user = await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message:"Deleted",user })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    return res.status(400).json({ message : "Can't delete Profile",camps })
}
module.exports = { registerUser, viewProfile, updateProfile, deleteProfile, loginUser }