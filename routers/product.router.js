productCtrl = require('../controllers/product.controller');

module.exports = (app) => {
    app.get('/products', productCtrl.index);

    app.get('/add-product', productCtrl.create);
    
    app.post('/add-product', productCtrl.store);
    
    app.get('/delete-product/:id', productCtrl.delete);
    
    app.get('/edit-product/:id', productCtrl.edit);
    
    app.post('/edit-product/:id', productCtrl.update);
};