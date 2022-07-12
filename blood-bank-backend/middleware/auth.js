const jwt = require("jsonwebtoken")
require('dotenv').config()
const User = require("../models/User")
const Donor = require("../models/Donor")
const Admin = require("../models/Admin")


const isAuthenticatedUser = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    if (!token) {
      next()
    }
    else {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      if (req.params.id && decodedData.id !== req.params.id)
        throw "You dont have access to this user's account"

      req.user = await User.findById(decodedData.id);
      res.locals.skipMiddleware1 = true
      res.locals.skipMiddleware2 = true
      next();
    }
  }
  catch (err) {
    return res.status(401).json({ message: "Error : " + err })
  }
}

const isAuthenticatedDonor = async (req, res, next) => {
  if (res.locals.skipMiddleware1) {
    return next()
  }
  const donorToken = req.headers.authorization.split(' ')[2]

  try {
    if (!donorToken) {
      next()
    }
    else {
      const decodedData = jwt.verify(donorToken, process.env.JWT_SECRET);

      if (req.params.id && decodedData.id !== req.params.id)
        throw "You dont have access to this user's account"
      req.user = await Donor.findById(decodedData.id);
      res.locals.skipMiddleware2 = true
      next();
    }
  }
  catch (err) {
    return res.status(401).json({ message: "Error : " + err })
  }
}

const isAuthenticatedAdmin = async (req, res, next) => {
  if (res.locals.skipMiddleware2) {
    return next()
  }
  const { adminToken } = req.cookies;
  try {
    if (!adminToken)
      throw "You dont have access to this page , please login"
    const decodedData = jwt.verify(adminToken, process.env.JWT_SECRET)
    req.user = await Admin.findById(decodedData.id)
    next()
  }
  catch (err) {
    return res.status(401).json({ errorMessage: err })
  }
}
module.exports = { isAuthenticatedUser, isAuthenticatedAdmin, isAuthenticatedDonor }