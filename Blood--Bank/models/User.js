const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const userSchema=new Schema({
    userName:
    {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    userAddress:
    {
        type:String,
        required:true
    },
    userContact:{
        type:Number,
        required:true,
        trim:true,
        minlength:10,
        maxlength:10
    },
    userPassword:{
        type:Number,
        required:true,
        minlength:6,
        maxlength:16
    },
    userEmail:{
        type:email,
        required:true
    }

},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema)
module.exports=User;