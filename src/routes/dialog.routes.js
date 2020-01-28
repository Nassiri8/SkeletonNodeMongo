module.exports = function(app){
    const dialog = require('../controllers/dialog.controller.js');

    app.get('/dialogs/:params', dialog.findRes);
    //app.post('/dialogs', dialog.create);
}
