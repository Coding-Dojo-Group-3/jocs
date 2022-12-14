const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const User = require('../models/user.model')

module.exports.secret = secret;

module.exports = {
    authenticate: (req, res, next) => {
        jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
            if (err) { 
                res.status(401).json({verified: false});
            } else {
                req.Token = payload
                next();
            }
        })
    },
    isLoggedIn:(req, res) => {
        jwt.verify(req.cookies.usertoken, secret, async (err, payload) => {
            if (err) { 
                res.status(401).json({verified: false});
            } else {
                const user = await User.findOne({_id:payload.id})
                const {_id ,firstName} = user
                return res.json({
                    user: {
                        id: _id,
                        firstName: firstName
                    }})
            }
        })
    }
}