var mysql = require("mysql");

var conecteBanco = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database: "escola"
});

module.exports = conecteBanco;

























