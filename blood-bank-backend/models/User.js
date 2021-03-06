const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    userAddress: {
        type: String,
        required: true
    },
    userContact: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    userPassword: {
        type: String,
        required: true,
        minlength: 6
    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true
    },
    role: {
        type: String,
        default: "user",
        required: false
    }

},
    {
        timestamps: true
    })

//jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: '12h',
    });
};

const User = mongoose.model('User', userSchema)
module.exports = User
