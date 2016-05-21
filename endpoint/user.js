var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var hash = bcrypt.hashSync("goddamnhash");




/*
    Param : username, password, email, sex
*/
router.post('/signup', function(req, res){
    
    var response = {};
    
    if(req.body.username && req.body.password && req.body.email && req.body.sex){
        console.log('cool');
        
            bcrypt.hash(req.body.password, null, null, function(err, hashed) {
   
        res.end(hashed);
});
        
    }else{
        response.error = true;
        
    }
        
        

    
    
    
    
});


module.exports = router;