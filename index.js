var http = require('http');
var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });

var port = process.env.PORT || 3000;

http.createServer(function (req, res) {

    // default: handle the request as a static file
    serveStaticFiles(req, res);
}).listen(port);

console.log('Listening on http://localhost:%d', port);
