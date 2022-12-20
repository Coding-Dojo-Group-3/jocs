const UserController = require('../controllers/user.controller');
const { authenticate,isLoggedIn } = require('../config/jwt.config')

module.exports = app => {
    // CREATE
    app.post('/api/users/register', UserController.register);
    // READ
    app.get('/api/users', UserController.getAll);
    app.post('/api/users/login', UserController.login)
    app.get('/api/users/logout',UserController.logout)
    app.post('/api/users/isLoggedIn', isLoggedIn)
    app.get('/api/users/:id', authenticate, UserController.getOne);
    // UPDATE
    app.patch('/api/users/:id', UserController.update);
    app.patch('/api/users/:id/password', UserController.updatePassword);
    // DELETE
    app.delete('/api/users/:id', UserController.delete);
}