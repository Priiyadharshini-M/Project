const jwt = require("jsonwebtoken")
require('dotenv').config()
const User = require ("../models/User")
const Donor = require("../models/Donor")
const Admin = require("../models/Admin")


const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.headers
    console.log(req.headers)
    console.log("token from auth:"+token)
try{
if (!token) {
    throw "Please Login to access this resource"
  }
  console.log("process token : ",process.env.JWT_SECRET)
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  if(req.params.id && decodedData.id !== req.params.id)
        throw "You dont have access to this user's account"

  req.user = await User.findById(decodedData.id);
  next();
}
catch(err){
    return res.status(401).json({message : "Error : "+err})
}
}

const isAuthenticatedDonor = async (req, res, next) => {
    const  { donorToken } = req.cookies;
    
try{
if (!donorToken) {
    throw new Error("Please Login to access this resource as a Donor");
  }
  console.log("process token : ",process.env.JWT_SECRET)
  const decodedData = jwt.verify(donorToken, process.env.JWT_SECRET);

  if(req.params.id && decodedData.id !== req.params.id)
        throw "You dont have access to this user's account"
  req.user = await Donor.findById(decodedData.id);
  next();
}
catch(err){
    return res.status(401).json({message : "Error : "+err})
}
}

const isAuthenticatedAdmin = async (req, res, next) => {
    console.log("is admin authenticate ...")
      const { adminToken }  = req.cookies;
      console.log("admin token",adminToken)
      try{
          if (!adminToken) 
          throw "You dont have access to this page , please login as admin"
          const decodedData = jwt.verify(adminToken, process.env.JWT_SECRET)
          req.user = await Admin.findById(decodedData.id)
          console.log("verified")
          next()
      }
      catch(err){
        return res.status(401).json({errorMessage : err})
      }
  }
module.exports = {isAuthenticatedUser, isAuthenticatedAdmin, isAuthenticatedDonor}