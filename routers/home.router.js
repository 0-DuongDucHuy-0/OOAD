homeCtrl = require('../controllers/home.controller');

module.exports = (app) => {
    app.get('/', homeCtrl.home);
};