/**
---------------------------------------------------------------------
Author:  Pedro Santana Minalla
Program:  REST API with NodeJS. Server Side
---------------------------------------------------------------------
*/
/**
------------------------------------------------------------------
Constants
------------------------------------------------------------------
*/
const express = require('express'); //Loads express library
const app = express(); 				//App initialization
const hostname = '127.0.0.1';		//Host
const port = 8081;					//Post number where server runs


//Load sqlite library
var sqlite3 = require('sqlite3').verbose();

var file = "api.db"; //Database file
var db = new sqlite3.Database(file); //Connection to database
//Creates database
db.serialize(function() {
 	db.run ("DROP TABLE IF EXISTS Users");
	db.run("CREATE TABLE Users (userid INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, email TEXT, phone TEXT)");
});

//Get all call
app.get('/api', function (req, res) {
	var records;
	db.serialize(function() {
	 	db.all("SELECT userid, name, email, email, phone FROM Users", function(err, row){
			records = JSON.stringify(row);
			console.log('GET request to /api/');
			console.log(row)
			res.send('GET COLLECTION \n' + records);
		});
	});	
});

//Get one record from api
app.get('/api/:id',function(req,res){
		db.serialize(function() {
		 db.all('SELECT userid, name, email, phone FROM Users WHERE userid='+req.params.id, function(err,row){
		  res.send("GET ITEM SUCCESSFUL \n" + JSON.stringify(row));
		  console.log('GET request to /api/'+ req.params.id);
		  console.log(row);
		});
	});
});

//Post call to api
app.post('/api', function (req, res) {
	var users; 
	req.on('data', function (chunk) {
		users = JSON.parse(chunk);
	});
		
	req.on('end', function (chunk) {
		db.serialize(function() {
			var stmt = db.prepare("INSERT INTO Users VALUES (null,?,?,?)");
			for (var i = 0; i <  users.users.length; i++) {
				stmt.run(users.users[i].name, users.users[i].email, users.users[i].phone);
			}
			stmt.finalize();
			console.log('CREATE request to /api/');
			console.log(users);
			res.send("CREATE ENTRY SUCCESSFUL");
		});
	});
});


//Put call to api. Replace records on api
app.put('/api', function (req, res) {
	var users; 
	req.on('data', function (chunk) {
		users = JSON.parse(chunk);
	});
	req.on('end', function (chunk) {
		db.serialize(function() {
			db.run('DELETE FROM Users;');
			var stmt = db.prepare("INSERT INTO Users VALUES (null,?,?,?)");
			for (var i = 0; i <  users.users.length; i++) {
				stmt.run(users.users[i].name, users.users[i].email, users.users[i].phone);
			}
			stmt.finalize();
			console.log('PUT request to /api/');
			console.log(users);
			res.send("REPLACE COLLECTION SUCCESSFUL");
		});
	});
});

//Put method to update a record
app.put('/api/:id', function (req, res) {
	var users;
	req.on('data', function (chunk) {
		users = JSON.parse(chunk);
	});
	req.on('end', function (chunk) {
		db.serialize(function() {
			var stmt = db.prepare("UPDATE  Users SET name=?, email=?, phone=? WHERE userid=(?)",req.params.id);
			for (var i = 0; i <  users.users.length; i++) {
				stmt.run(users.users[i].name, users.users[i].email, users.users[i].phone);
			}
			stmt.finalize();
			console.log('PUT request to /api/ for update');
			console.log(users);
			res.send("UPDATE ITEM SUCCESSFUL");
		});
	});
});

//Delete call all call to api
app.delete('/api', function (req, res) {
	db.serialize(function(){
		db.run('DELETE FROM Users;');
		console.log('DELETE request to /api/');
		res.send('DELETE COLLECTION SUCCESSFUL');
	});
});

//Delete call to api. Deletes a record from api
app.delete('/api/:id', function (req, res) {
	db.serialize(function(){
		db.run('DELETE FROM Users WHERE userid=(?)', req.params.id);
		console.log('DELETE ITEM request to /api/');
		res.send('DELETE ITEM SUCCESSFUL');
	});
});

//Starts the server
var server = app.listen(port, function ()
{
	console.log("API listening at http://%s:%s", hostname, port)
});