var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var hash = bcrypt.hashSync("goddamnhash");
var validator = require('validator');

var db = require('../database');




/*
    Param : username, password, email, sex
*/
router.post('/signup', function (req, res) {

    var response = {};

    if (req.body.username && req.body.password && req.body.email && req.body.sex) {

        //Trim spaces before and after
        req.body.username = req.body.username.trim();
        req.body.sex = req.body.sex.trim();
        req.body.email = req.body.email.trim();
        req.body.password = req.body.password.trim();

        //Password length
        if (req.body.password.length < 8) {

            response.error = true;
            response.status = "Password must not be less than";
            res.end(JSON.stringify(response));
            return;

        }

        //Check for email validation
        if (!validator.isEmail(req.body.email)) {
            response.error = true;
            response.status = "Wrong value for email";
            res.end(JSON.stringify(response));
            return;
        }


        //Check for appropriate value for sex
        if (!(req.body.sex == 'M' || req.body.sex == 'F')) {
            response.error = true;
            response.status = "Wrong value for sex";
            res.end(JSON.stringify(response));
            return;
        }



        bcrypt.hash(req.body.password, null, null, function (err, hashed) {

            //Make a new node
            var _password = hashed;

            db.cypher({
                query: "CREATE (n:User { username : {username}, password: {password}, email: {email},sex: {sex}}) RETURN n",
                params: {
                    username: req.body.username,
                    password: _password,
                    sex: req.body.sex,
                    email: req.body.email
                }
            }, function (err, results) {

                if (err) {
                    response.error = true;
                    response.status = err.neo4j.message;
                    res.end(JSON.stringify(response));
                    return;
                } else {

                    response.error = false;
                    response.status = results;
                    res.end(JSON.stringify(response));


                }


            });

        });

    } else {
        response.error = true;
        response.status = "Missing fields";

        res.end(JSON.stringify(response));
        return;


    }

});


module.exports = router;