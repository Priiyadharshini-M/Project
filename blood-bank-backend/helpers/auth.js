const jwt = require("jsonwebtoken")
require('dotenv').config()
const User = require ("../models/User")
const Donor = require("../models/Donor")


isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies
    console.log(req.cookies)
    console.log("token from auth:"+token)
try{
if (!token) {
    throw "Please Login to access this resource"
  }
  console.log("process token : ",process.env.JWT_SECRET)
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
}
catch(err){
    return res.status(401).json({message : "Error : "+err})
}
}

// isAuthenticatedDonor = async (req, res, next) => {
//     const  token = req.cookies;
    
// try{
// if (!token) {
//     throw new Error("Please Login to access this resource");
//   }
//   console.log("process token : ",process.env.JWT_SECRET)
//   const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//   req.user = await Donor.findById(decodedData.id);
//   next();
// }
// catch(err){
//     return res.status(401).json({message : "Error : "+err})
// }
// }
module.exports = {isAuthenticatedUser}