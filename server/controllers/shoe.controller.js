const Shoe= require('../models/shoe.model')


module.exports = {
    create: (req, res) => {
        Shoe.insertMany(req.body, {forceServerObjectId:true} )
            .then( result => {
                res.status(201).json(result)
            })
            .catch( err => {
                res.status(400).json({ message: 'Something went wrong! (shoe create)', error: err })
            });
    },
    getAll: (req, res) => {
        Shoe.find()
            .then( result => {
                res.json(result)
            })
            .catch( err => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    getOne: (req, res) => {
        Shoe.findOne({ _id: req.params.id })
            .then(result=> {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    },
    update: (req, res) => {
        Shoe.findOneAndUpdate(
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
        Shoe.deleteOne({ _id: req.params.id })
            .then(result => {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong!', error: err })
            });
    }
}