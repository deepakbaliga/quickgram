var database_url = require('./config').database_url;
var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(database_url);


//make email  unique
//make username unique

var emailConstraint = "CREATE CONSTRAINT ON (u:User) ASSERT u.email IS UNIQUE";

var usernameConstraint = "CREATE CONSTRAINT ON (u:User) ASSERT u.username IS UNIQUE";


db.cypher({
    query: emailConstraint
}, function (err, result) {
    if (err) throw err;
});

db.cypher({
    query: usernameConstraint
}, function (err, result) {
    if (err) throw err;
});




module.exports = db;