const ketnoi = require('../connect-mysql');
const sesionStorage = require('node-sessionstorage');

exports.home = (req, res) => {
    res.render('login', {
        err_msg: '',
    });
}

exports.signIn = (req, res) => {
    let sql = "SELECT * FROM users WHERE Email = ? AND PasswordHash = ?";
    ketnoi.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (data[0].Role == 'admin') {
            if (err || data.length == 0) {
                res.render('login', {
                    err_msg: 'Tài khoản hoặc mật khẩu không chính xác',
                });
            } else {
                let accountJSON = JSON.stringify(data[0]);
                sesionStorage.setItem('admin_login', accountJSON);
                res.redirect('/');
            }
        } else if (data[0].Role == 'user') {
            if (err || data.length == 0) {
                res.render('login', {
                    err_msg: 'Tài khoản hoặc mật khẩu không chính xác',
                });
            } else {
                let accountJSON = JSON.stringify(data[0]);
                sesionStorage.setItem('user_login', accountJSON);
                res.redirect('/');
            }
        }
    });
}

exports.logOut = (req, res) => {
    sesionStorage.removeItem('admin_login');
    sesionStorage.removeItem('user_login');
    res.redirect('/login');
}