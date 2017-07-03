var request = require("request");

module.exports = function (req, res) {

  const SERVER_URL = "https://jsonplaceholder.typicode.com/users";

        request({
          uri: SERVER_URL,
          method: "GET",
          timeout: 10000,
          followRedirect: true,
          maxRedirects: 10
        }, function(error, response, body) {

          res.writeHead(200, {
              'Content-Type': 'application/x-json-stream'
          });

          res.write(body);
          res.end();
        });
};
