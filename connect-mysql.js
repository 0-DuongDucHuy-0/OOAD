const mysql = require('mysql');

const ketnoi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookdb',
});

ketnoi.connect(function (err) {
    if (err) {
        console.log('Kết nối mysql thất bại');
    }
});

module.exports = ketnoi;