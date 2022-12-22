const User= require('../models/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

module.exports = {
    getOne: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(result=> {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    getAll: (req, res) => {
        User.find()
            .then( result => {
                res.json(result)
            })
            .catch( err => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    update: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then( result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    delete: (req, res) => {
        User.findByIdAndDelete({ _id: req.params.id })
            .then(res => {
                res.clearCookie('usertoken');
                res.status(200).json({user:"Deleted"})
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    register: (req, res) => {
        console.log("Attempting to register: ", req.body)
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "Registration successful!", user: user });
            })
            .catch((err)=>{
                res.status(400).json({msg:"Something went wrong (registration)",error:err})
            })
    },
    login: (req, res) => {
        User.findOne({email:req.body.email})
            .then((user)=>{
                const {_id, firstName, ...other} = user
                if(user === null) {
                    res.status(400).json({message:"*Invalid Login Attempt"});
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid) {
                                // console.log("Password is valid")
                                const userToken = jwt.sign({
                                    id: user._id,
                                    firstName: user.firstName
                                }, process.env.SECRET_KEY)
                                res
                                    .cookie('usertoken',userToken,{httpOnly:true})
                                    .json({user:
                                        {id: _id,
                                        firstName: firstName,
                                    }})
                            } else {
                                res.status(400).json({message:"*Invalid Login Attempt"});
                            }
                        })
                        .catch((err)=>{
                            res.status(400).json({message:"*Invalid Login Attempt",error:err})
                        })
                }
            })
            .catch((err)=>{
                res.status(400).json({message:"*Invalid Login Attempt",error:err})
            })
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.status(200).json({user:"Logged Out"})
    },
    updatePassword: (req, res) => {
        if(req.body.password !== req.body.confirmPassword) {
            res.status(400).json({message:"Passwords do not match"})
        } else {
            bcrypt.hash(req.body.password, 10)
                .then((hashedPassword)=>{
                    User.findOneAndUpdate(
                        {_id: req.params.id},
                        {password: hashedPassword},
                        {new: true, runValidators: true, context: 'query'}
                    )
                        .then(result => {
                            res.status(200).json(result)
                        })
                        .catch((err) => {
                            res.status(400).json({ message: 'Something went wrong!', error: err })
                        });
                })
                .catch((err)=>{
                    res.status(400).json({message:"Something went wrong",error:err})
                })
        }
    }
}