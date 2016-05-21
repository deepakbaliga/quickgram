var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validator = require('validator');
var morgan = require('morgan');


app.set('port', 3000);

app.disable('x-powered-by');
app.disable('x-content-type-options');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/user', require('./endpoint/user'));


app.listen(app.get('port'));