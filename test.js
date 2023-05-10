var http = require('http')

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
  res.end('hello world') 
})

server.listen(3128, '127.0.0.1')
