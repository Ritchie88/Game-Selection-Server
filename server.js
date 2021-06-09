//Ryan Ritchie
let http = require('http');
let fs = require('fs');
let path = require('path');
const pug = require('pug');


var response;
let numPlayers = 0;




//set the renders for each different pug page
const renderHome = pug.compileFile("./home.pug");


//404 Sending function 
function send404(response) {
	response.writeHead(404, { 'Content-Type': 'text/plain' });
	response.write('Error 404: Resource not found.');
	response.end();
}

let server = http.createServer(function (req, res) {
	if (req.method === 'GET') {//if the request method is GET
		let fileurl;
		if (req.url == '/'){//if the user wants to go to the home page
			
			let content = renderHome({});//sync the home pug page
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/html");
			res.end(content);//send the response to the client, opening the home page
		}else if(req.url == '/client.js'){//if the client.js file is requested
			fs.readFile("client.js", function(err, data){//read the files information
				if(err){//if an error occurs, send a server error
					send500(response);
					return;
				}
				//send the success response with the javascript file
				res.statusCode = 200;
				res.end(data);
				numPlayers++;
				return;
			});		
		}else{//any other request will be met with a 404 response
			send404(res);
		}
	}else if(req.method == "POST"){//if the request method is a POST, sending info to the server
		let body = ""
			req.on('data', (chunk) => {//collect the JSON string from the client
				body += chunk;
			})
			//when the full string is read, we now will parse it and use the data in the object
			req.on('end', () => {
				numPlayers++;
				console.log(body);
				res.writeHead(200,);
					res.end();
					return;
			});
	}else{ //if not a GET request, send 404
		send404(res);
	}
});
//set the port to listen to
server.listen(3000);
console.log('server running on port 3000');