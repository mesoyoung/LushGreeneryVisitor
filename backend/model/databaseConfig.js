var mysql = require('mysql');

var dbConnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root1234",
            database: "lushgreenery",
        });
        return conn;
    }
}
module.exports = dbConnect;