var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use( bodyParser.json() ) // for parsing JSON data that comes in with requests
app.use( bodyParser.urlencoded({extended: true})) // for parsing data from forms

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


/*
read	GET 	/messages 		get all messages
create	POST 	/messages 		make a new message
read	GET 	/messages/:id 	get message with matching id
update	POST 	/messages/:id 	update message with matching id
delete	DELETE 	/messages/:id 	delete message with matching id
*/


let idCounter = 0;

let Message = function(content, username) {
	this.content = content;
	this.username = username;
	this.created_at = new Date().getTime();
	this.updated_at = null;
	this.deleted_at = null;
	this.id = idCounter++;

	messages.push(this);
}




var messages = [];

//new Message("Hello!", "melissa");
//new Message("Hello again!", "melissa");
//new Message("Hello for the last time.", "melissa");




app.get('/', function (req, res) {
  res.send('This is an API, dummy. You can\'t access the messages here');
})



app.get('/messages', function (req, res) {

	let results = messages.filter(function(message) {
		// keep messages that have null for their deleted_at
		return message.deleted_at == null;
	})

	res.json(results)
})




app.get('/messages/:id', function (req, res) {
	//let result;
	// for (var i = 0; i < messages.length; i++) {
	// 	if ( messages[i].id == req.params.id ) {
	// 		result = messages[i];
	// 	}
	// }
	//res.json( result );

	let results = messages.filter(function(message) {
		return message.id == req.params.id;
	})
	
	res.json( results[0] );
})





app.post('/messages/:id', function (req, res) {
	console.log("edit a message!")

	let results = messages.filter(function(message) {
		return message.id == req.params.id;
	})

	results[0].updated_at = new Date().getTime();
	results[0].content = req.body.content;

	res.json( results[0] );
});





app.delete('/messages/:id', function (req, res) {
	console.log("delete a message!")

	let results = messages.filter(function(message) {
		return message.id == req.params.id;
	})

	results[0].deleted_at = new Date().getTime();

	res.json( results[0] );
});




app.post('/messages', function (req, res) {
  let newMessage = new Message(req.body.content, req.body.username);
  res.send(newMessage);
})

app.listen(1337, function () {
  console.log('Example app listening on port 1337!')
})











