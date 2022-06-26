const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs');
const jwt =  require("jsonwebtoken");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
    userAddress : {
        type : String,
        required : true
    },
    userContact:{
        type : Number,
        required:true,
        trim:true,
        minlength:10,
        maxlength:10
    },
    userPassword : {
        type : String,
        required : true,
        minlength : 6,
        maxlength : 16
    },
    confirmUserPassword : {
        type : String,
        required : true,
        minlength : 6,
        maxlength : 16
    },
    userEmail : {
        type : String,
        required : true
    }

},
{
    timestamps : true
})

//hashing password
User.pre('save',async function(next){
    if(this.isModified('userPassword')){
        this.userPassword = bcryptjs.hashSync(this.userPassword, 10);
    }
    next();
})

//jwt token
User.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},""+process.env.JWT_SECRET,{
        expiresIn:'12h',
    });
};

User.methods.comparePassword =  async function (enteredPassword) {
    console.log(enteredPassword+" "+this.password)
    return await bcryptjs.compare(enteredPassword,this.password);
  };
const User = mongoose.model('User',userSchema)
module.exports = {User , getJWTToken, comparePassword }