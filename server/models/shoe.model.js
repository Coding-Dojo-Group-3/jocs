const mongoose = require('mongoose');

const ShoeSchema = new mongoose.Schema({
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
}, 
{timestamps: true }
)

const Shoe = mongoose.model("Shoe", ShoeSchema)

module.exports = Shoe;