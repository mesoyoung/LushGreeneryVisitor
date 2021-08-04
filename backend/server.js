var app = require('./controller/app.js');
var port = 3031;

const server = app.listen(port, function () {
    console.log("App hosted at port: "+port)
})