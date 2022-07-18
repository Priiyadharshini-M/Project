const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const { date } = require('@hapi/joi');
const Schema = mongoose.Schema;
const donorSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    bloodGroup: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastDonateDate: {
        type: Date,
        required: true,
    },
    allergies: {
        type: String,
        required: true,
    },
    disease: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

donorSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, role: "donor" }, process.env.JWT_SECRET, {
        expiresIn: '12h',
    });
};

const Donor = mongoose.model('Donor', donorSchema)
module.exports = Donor