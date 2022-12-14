const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator');

const CartSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    details: {
        type: String,
    },
    size: {
        type: Number,
    },
    gender: {
        type: String,
    },
    condition: {
        type: String,
    },
    images: [
        {
            type: String,
        }
    ]
})

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "*First name is required."],
        minLength: [2, "*First name must be at least 2 characters long."],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "*Last name is required."],
        minLength: [2, "*Last name must be at least 2 characters long."],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "*Email is required."],
        match: [ /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "*Invaild email address."], 
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "*Password is required."],
        minLength: [8, "*Password must be at least 8 characters long."],
    },
    cart: [CartSchema]
}, 
{timestamps: true }
)

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', '*Password must match confirm password.');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });

const User = mongoose.model("User", UserSchema)

UserSchema.plugin(uniqueValidator, { message: '*Sorry, "{VALUE}" is already in use.' });

module.exports = User;