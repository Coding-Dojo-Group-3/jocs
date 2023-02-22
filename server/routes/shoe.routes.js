const ShoeController = require('../controllers/shoe.controller')

module.exports = app => {
    app.get('/api/shoes', ShoeController.getAll)
    app.get('/api/shoes/:id', ShoeController.getOneById)
}