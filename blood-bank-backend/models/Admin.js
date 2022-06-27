const { string, required } = require('@hapi/joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    adminEmail : {
        type : string,
        lowercase : required,
        required : true
    },
    adminPassword : {
        type : string,
        required : true
    }
},
{
    timestamps : true
})

const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin