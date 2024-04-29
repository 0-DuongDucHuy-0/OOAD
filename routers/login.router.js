loginCtrl = require('../controllers/login.controller');

module.exports = (app) => {
    app.get('/login', loginCtrl.home);
    app.post('/login', loginCtrl.signIn);
    app.get('/logout', loginCtrl.logOut);
};