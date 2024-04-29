const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = require('../models/product.model');

exports.index = async (req, res) => {
    Product.getAll(req, (err, data, totalPages, _page, _name) => {
        res.render('products-admin', {
            title: 'Quản lý đấu giá',
            data: data ? data : [],
            totalPages: totalPages,
            _page: parseInt(_page),
            _name: _name,
        });
    });
};

exports.create = (req, res) => {
    res.render('add-product');
};

exports.store = (req, res) => {
    let hoursSelect = parseInt(req.body.hourSelect);
    let BookID = req.body.BookID;
    let Price = req.body.Price;

    Product.store(hoursSelect, BookID, Price, (err, data) => {
        if (err) {
            res.render('error', {
                message: err.sqlMessage,
                code: err.errno,
            })
        } else {
            res.redirect('/products-admin');
        }            
    });
};

exports.delete = (req, res) => {
    let id = req.params.id;
    Product.delete(id, (err, data) => {
        if (err) {
            res.render('error', {
                message: err.sqlMessage,
                code: err.errno,
            })
        } else {
            res.redirect('/products-admin');
        }
    });
};

exports.edit = (req, res) => {
    let id = req.params.id;
    Product.getOne(id, (err, data) => {
        if (err) {
            res.render('error', {
                message: err.sqlMessage,
                code: err.errno,
            });
        } else {
            res.render('edit-product', {
                cat: data,
            });
        }
    });
};

exports.update = (req, res) => {
    let id = req.params.id;
    let hourSelect = parseInt(req.body.hourSelect);
    let BookID = req.body.BookID;
    let Price = req.body.Price;

    Product.update(id, hourSelect, Price, BookID, (err) => {
        if (err) {
            res.render('error', {
                message: err.sqlMessage,
                code: err.errno,
            });
        } else {
            res.redirect('/products-admin');
        }
    });
};