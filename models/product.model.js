const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = () => {}

Product.getAll = async (req, callback) => {
    let _name = req.query.name;
    // lấy trang hiện tại 1 2 3
    let _page = req.query.page ? req.query.page : 1;

    // truy vấn số sản phẩm
    let sql_total = "SELECT COUNT(*) as total FROM auctions JOIN books ON auctions.BookID = books.BookID";
    if (_name) {
        sql_total += " WHERE Title LIKE '%" + _name + "%'";
    }
    let rowData = await query(sql_total);
    let totalProducts = rowData[0].total;

    let _limit = 10;

    // tính số trang để hiển thị sản phẩm
    let totalPages = Math.ceil(totalProducts / _limit);
    _page = _page > 0 ? Math.floor(_page ) : 1;
    _page = _page < totalPages ? Math.floor(_page) : totalPages;

    let _start = (_page - 1) * _limit;

    let sql = "SELECT * FROM auctions JOIN books ON auctions.BookID = books.BookID";

    if (_name) {
        sql += " WHERE Title LIKE '%" + _name + "%'";
    }

    sql += " ORDER BY auctions.AuctionID LIMIT " + _start + "," + _limit;

    ketnoi.query(sql, (err, data) => {
        callback(err, data, totalPages, _page,_name);
    });
};

Product.store = (hourSelect, BookID, Price, callback) => {
    let ts = Date.now();
    let date_ob = new Date(ts);

    function getTime(date_ob) {
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }

    // prints date & time in YYYY-MM-DD format
    let StartTime = getTime(date_ob);

    date_ob.setHours(date_ob.getHours() + hourSelect);
    let EndTime = getTime(date_ob);

    let auctionData = {
        BookID: BookID,
        StartTime: StartTime,
        EndTime: EndTime,
        Status: "Đang diễn ra",
        price: Price,
    };

    let sql = "INSERT INTO auctions SET ?"

    ketnoi.query(sql, auctionData, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

Product.delete = (id, callback) => {
    let sql_delete = "DELETE FROM auctions WHERE AuctionID = ?";
    ketnoi.query(sql_delete, [id], function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

Product.getOne = (id, callback) => {
    ketnoi.query("SELECT * FROM auctions JOIN books ON auctions.BookID = books.BookID WHERE AuctionID = ?", [id], (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data.length ? data[0] : {});
        }
    });
};

Product.update = (id, hourSelect, Price, BookID, callback) => {
    let ts = Date.now();
    let date_ob = new Date(ts);

    function getTime(date_ob) {
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }

    // prints date & time in YYYY-MM-DD format
    let StartTime = getTime(date_ob);

    date_ob.setHours(date_ob.getHours() + hourSelect);
    let EndTime = getTime(date_ob);

    let auctionData = {
        BookID: BookID,
        StartTime: StartTime,
        EndTime: EndTime,
        Status: "Đang diễn ra",
        price: Price,
    };

    let sql = "UPDATE auctions SET ? WHERE AuctionID = ?";

    ketnoi.query(sql, [auctionData, id], (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

module.exports = Product;