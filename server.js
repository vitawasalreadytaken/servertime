var HOST = '0.0.0.0';
var PORT = 37890

var http = require('http');

var server = http.createServer(function (request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*',
	});
	var now = new Date();
	response.end(String(now.getTime()));
});

server.listen(PORT, HOST);
console.log('Server is running at http://' + HOST + ':' + PORT);
