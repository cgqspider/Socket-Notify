var express = require("express");
var app = express();

var port = process.env.PORT || 3000;
 
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
http.listen(port, function () {
    console.log("Server connected");
 
    io.on("connection", function (socket) {
        console.log("User " + socket.id);
 
        socket.on("messageSent", function (message) {
            socket.broadcast.emit("messageSent", message);
        });
    });
});