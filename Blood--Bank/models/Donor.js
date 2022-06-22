const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const donorSchema=new Schema({
    userName:
    {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    password:
    {
        type:String,
        required:true,
        minlength:6,
        maxlength:15
    },
    address:
    {
        type:String,
        required:true
    },
    city:
    {
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        trim:true,
        minlength:10,
        maxlength:10
    },
    bloodGroup:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:email,
        required:true
    },
    lastDonateDate:{
        type:String,
        required:true,
    },
    allergies:{
        type:String,
        required:true,
    },
    disease:{
        type:String,
        required:true
    }


},
{
    timestamps:true
})

const Camp=mongoose.model('Camp',campSchema)
module.exports=Camp;