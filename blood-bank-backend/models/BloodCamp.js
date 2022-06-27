const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const campSchema = new Schema({
    hospitalName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
    address : {
        type : String,
        required : true
    },
    campName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    }

},
{
    timestamps : true
})

const Camp = mongoose.model('Camp',campSchema)
module.exports = {Camp}