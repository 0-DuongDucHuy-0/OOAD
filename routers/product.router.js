productAdminCtrl = require('../controllers/product-admin.controller');
productUserCtrl = require('../controllers/product-user.controller');

module.exports = (app) => {
    app.get('/products-user', productUserCtrl.index);
    app.get('/buy-product/:id', productUserCtrl.buy);
    app.post('/buy-product/:id', productUserCtrl.buySuccessful);

    app.get('/products-admin', productAdminCtrl.index);
    app.get('/add-product', productAdminCtrl.create);
    app.post('/add-product', productAdminCtrl.store);
    app.get('/delete-product/:id', productAdminCtrl.delete);
    app.get('/edit-product/:id', productAdminCtrl.edit);
    app.post('/edit-product/:id', productAdminCtrl.update);
};