var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var hash = bcrypt.hashSync("goddamnhash");
var validator = require('validator');
var db = require('../database');
var shortid = require('shortid');
var accesskey = require('../config').accesskey;
var secret = require('../config').secret;

var AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: accesskey,
    secretAccessKey: secret
});

AWS.config.update({
    region: "us-west-2"
});

var s3 = new AWS.S3();





router.get('/uploadurl', function (req, res) {

    var urlParams = {
        Bucket: 'quickgrampost',
        Key: shortid.generate() + shortid.generate() + '.jpg',
        Expires: 3600


    };
    s3.getSignedUrl('putObject', urlParams, function (err, url) {
        if (!err) {
            res.end(url);
        } else {
            res.end(err);
        }
    })
});

module.exports = router;