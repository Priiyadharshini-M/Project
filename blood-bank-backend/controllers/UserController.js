const User = require('../models/User')

const registerUser = async(req,res) => {
    let registerUser
    const{ userName, userEmail, userPassword, confirmUserPassword, userContact, userAddress } = req.body
    try{
        registerUser = new User({
            userName,
            userAddress,
            userContact,
            userPassword,
            confirmUserPassword,
            userEmail
        })
        await registerUser.save()
        return res.status(201).json({ message : "Succesfully logged in",registerUser })
    }
    catch(err) {
        return res.status(404).json({ message : err.message })
    }
    
    return res.status(404).json({ message : "Unable to login user" })
        
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
            confirmUserPassword,
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
module.exports = { registerUser, viewProfile, updateProfile, deleteProfile }