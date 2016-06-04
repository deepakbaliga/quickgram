var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var hash = bcrypt.hashSync("goddamnhash");
var validator = require('validator');
var db = require('../database');
var shortid = require('shortid');

var AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: "AKIAIH5GN7DCFIVRAADA",
    secretAccessKey: "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"
});

AWS.config.update({
    region: "us-west-2"
});

var s3 = new AWS.S3();





router.get('/getuploadurl', function (req, res) {

    var urlParams = {
        Bucket: 'quickgrampost',
        Key: shortid.generate() + shortid.generate()
    };
    s3.getSignedUrl('getObject', urlParams, function (err, url) {
        if (!err) {
            res.end(url);
        } else {
            res.end(err);
        }
    })
});

module.exports = router;