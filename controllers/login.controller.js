const ketnoi = require('../connect-mysql');
const sesionStorage = require('node-sessionstorage');

exports.home = (req, res) => {
    res.render('login', {
        err_msg: '',
    });
}

exports.signIn = (req, res) => {
    let sql = "SELECT * FROM users WHERE Email = ? AND PasswordHash = ? AND Role = 'admin'";
    ketnoi.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err || data.length == 0) {
            res.render('login', {
                err_msg: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        } else {
            let accountJSON = JSON.stringify(data[0]);
            sesionStorage.setItem('admin_login', accountJSON);
            res.redirect('/');
        }
    });
}