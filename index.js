var http = require('http');
var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });

// use port 3000 unless there exists a preconfigured port
var port = process.env.PORT || 3000;

http.createServer(function (req, res) {

    // default: handle the server request as a static file
    serveStaticFiles(req, res);
}).listen(port);

console.log('Listening on http://localhost:%d', port);
