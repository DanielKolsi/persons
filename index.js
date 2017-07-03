var http = require('http');
var serveStaticFiles = require('ecstatic')({ root: __dirname + '/static' });

// use port 3000 unless there exists a preconfigured port
var port = process.env.PORT || 3000;

http.createServer(function (req, res) {


    if (req.url.indexOf('/api') === 0) {
      return require('./api/http-get')(req, res);
    }

    serveStaticFiles(req, res);    // default: handle the server request as a static file

}).listen(port);

console.log('Listening on http://localhost:%d', port);
