const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.set('view engine', 'ejs');
const POST = process.env.POST || 3000;

app.use(express.static('public'));

require('./routers/home.router')(app);

require('./routers/product.router')(app);

app.listen(POST, function() {
    console.log('listening on port'+ POST );
});

