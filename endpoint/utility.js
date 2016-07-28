var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var hash = bcrypt.hashSync(require('../config').password_hash);
var validator = require('validator');

var db = require('../database');





router.get('/users', function (req, res) {

    var response = {};

    db.cypher({
        query: "MATCH (n:User) RETURN n"
    }, function (err, result) {
        if (!err && result.length > 0) {


            res.end(JSON.stringify(result));

        } else {
            response.error = true;
            response.status = "No Users";
            res.end(JSON.stringify(response));
            return;
        }
    });

});



module.exports = router;