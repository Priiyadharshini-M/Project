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
        type:String,
        required:true,
        minlength:6,
        maxlength:16
    },
    confirmUserPassword:{
        type:String,
        required:true,
        minlength:6,
        maxlength:16
    },
    userEmail:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema)
module.exports=User;