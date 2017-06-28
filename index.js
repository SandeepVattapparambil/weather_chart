var http = require('http'),
  filed = require('filed');

server = http.createServer(function(req, resp) {
  if (req.url === "/") {
    req.pipe(filed('./public/index.html')).pipe(resp);
  } else {
    req.pipe(filed("./public" + req.url)).pipe(resp);
  }
});

var port = process.argv[2] || 8080

server.listen(port, function() {
  console.log("Server started on " + port);
});
