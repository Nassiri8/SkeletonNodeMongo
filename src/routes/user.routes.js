module.exports = function(app) {

    const user = require('../controllers/user.controller.js');

    app.get('/users', user.findAll);
    app.post('/users', user.create);
    app.post('/users/connect', user.connect);
    app.get('/users/:user', user.findByName);
    app.delete('/users/:name', user.deleteUser);
    app.put('/users/:name', user.updateUser);

}
