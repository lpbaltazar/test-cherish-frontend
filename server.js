var express = require('express');
var app = express();

app.use(express.static('frontend'));
var server = app.listen(5000, function(){
    var port = server.address().port;
    console.log('Admin App is running at port %s', port);
});