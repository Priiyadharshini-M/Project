const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    adminName: {
        type: String,
        required: false
    },
    adminEmail: {
        type: String,
        lowercase: true,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

adminSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '5h',
    });
}

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
