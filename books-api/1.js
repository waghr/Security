const { response } = require('express')
const express = require('express')
const req = require('express/lib/request')
const { get } = require('express/lib/response')

const app = express()

app.use(express.json())

//start authentication
const fs = require("fs");
var path = require('path');

function authentication(req, res, next) {
	var authheader = req.headers.authorization;
	console.log(req.headers);

	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}

	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	if (user == 'admin' && pass == 'passwords') {

		// If Authorized user
		next();
	} else {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// First step is the authentication of the client
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));
//end authentication

const books = [
    {title: 'java programming', id: 1},
    {title: 'hindi', id: 2},
    {title: 'english', id: 3},
]

app.get('/',(req, resp)=>{
    resp.send('Welcome to study REST api with nie js')

})
app.get('/api/books',(req,resp)=>{
    resp.send(books)
})

app.get('/api/books/:title',(req,resp)=>{
    console.log(req.params)
    resp.send(req.params);
})

app.listen(8080)
