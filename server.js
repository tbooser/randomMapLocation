var express = require('express');
var http = require('http');
var app = express();
var routes = express.Router();

const PORT= process.env.PORT || 5000; 
	app.listen(PORT);
//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}


routes.get('/', function (req, res) {
  res.sendFile(path.join( __dirname + '/dist/index.html' ));
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});