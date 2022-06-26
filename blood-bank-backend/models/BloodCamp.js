const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const campSchema = new Schema({
    hospitalName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
        //validate:{
        //     validator:function(hospital){
        //         return hospital.match(/^[a-zA-Z ]+$/)
        //     },
        //     message:'Hospital name should contain only alphabets and space'
        // }
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
        // validate:{
        //     validator:function(camp){
        //         return camp.match(/^[a-zA-Z/d!@ ]+$/)
        //     },
        //     message:'Camp name should contain only alphabets,space,digits,! and @'
        // }
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
        // validate:{
        //     validator:function(date){
        //         return date>Date.now()
        //     },
        //     message:'Camp finished'
        // }
    }

},
{
    timestamps : true
})

const Camp = mongoose.model('Camp',campSchema)
module.exports = Camp