const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessionStorage = require('node-sessionstorage');
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.set('view engine', 'ejs');
const POST = process.env.POST || 3000;

app.use(express.static('public'));

require('./routers/login.router')(app);
app.use(function(req, res, next) {
    let accountJSON = sessionStorage.getItem('admin_login');
    if (accountJSON) {
        global.account = JSON.parse(accountJSON);
        next();
    } else {
        accountJSON = sessionStorage.getItem('user_login');
        if (accountJSON) {
            global.account = JSON.parse(accountJSON);
            next();
        } else {
            res.redirect('/login');
        }
    } 
});


require('./routers/home.router')(app);
require('./routers/product.router')(app);

app.listen(POST, function() {
    console.log('listening on port'+ POST );
});

