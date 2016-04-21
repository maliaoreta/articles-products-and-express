var express = require('express'),
    app = express(),
    productsRoute = require('./routes/products.js'),
    articlesRoute = require('./routes/articles.js'),
    bodyParser = require('body-parser'),
    pgp = require('pg-promise')(),
    dbConn = require('./config.json');

var db = pgp(dpConn);

var methodOverride = require('method-override');

app.set('view engine', 'jade');
app.set('views', './templates');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/products', productsRoute);
app.use('/articles', articlesRoute);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at 3000');
});