const ShoeController = require('../controllers/shoe.controller');
const { authenticate, isLoggedIn } = require('../config/jwt.config')

module.exports = app => {
    app.get('/api/shoes', ShoeController.getAll);
    app.post('/api/shoe', authenticate, ShoeController.create);
    app.get('/api/shoe/:id', ShoeController.getOne);
    app.put('/api/shoe/:id', ShoeController.update);
    app.delete('/api/shoe/:id', ShoeController.delete);
}