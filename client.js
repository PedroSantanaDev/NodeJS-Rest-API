/**
---------------------------------------------------------------------
Author:  Pedro Santana Minalla

Program:  REST API with NodeJS. Test client Side

---------------------------------------------------------------------
*/
/**
*----------------------------------------------------------------------
Constants
*----------------------------------------------------------------------
*
*/
const http = require('http');
const port = 8081;
const path = '/api';
const hostname = '127.0.0.1';
var options = {
	host: 'localhost',
	path: '/api', 
    port: port, 
    method: 'GET'
};

//Initial data to load the API
var data = JSON.stringify({
			"users":[
			    {"name": "Anna Jones",	  "email": "anna@gmail.com", "phone" : "245-458-4578"},
			    {"name": "Peter Adams",   "email": "peter@yahoo.com", "phone" : "458-587-4578"},
			    {"name": "jay Jones",     "email": "jay@yahoo.com", "phone" : "458-587-5987"},
			    {"name": "Maria Lopez",   "email": "maria@yahoo.com", "phone" : "458-258-2354"},
			    {"name": "j.c Smith",     "email":"c.j@msn.com", "phone" : "458-587-4578"},
			    {"name": "Nora Mars", 	  "email":"nora@msn.com", "phone" : "245-487-4587"},
			    {"name": "Joe Jones", 	  "email":"joe@bell.com", "phone" : "289-568-4578"},
			    {"name": "Mery King", 	  "email":"meryking@yahoo.com", "phone" : "568-458-4578"},
			    {"name": "James Smith",   "email":"james_smith@bell.com", "phone" : "568-458-4578"},
			    {"name": "Lora Palmer",   "email":"lora-palmel@yahoo.com", "phone" : "457-458-4578"},
			    {"name": "Alex Jaja", 	  "email":"alex@yahoo.com", "phone" : "458-458-4578"}
			]
		});
//Data to replace the records on the API
var Putdata = JSON.stringify({
			"users":[
			    {"name": "JJ", "email": "JJ@gmail.com", "phone":"245-458-4578"}, 
			    {"name": "Anna Jones",	  "email": "anna@gmail.com", "phone" : "584-124-1245"}
			]
		});

//To update a record
var PutRecord =	JSON.stringify({"users":[
		{"name": "JJ", "email": "JJ@gmail.com", "phone":"245-458-4578"}
		]
	});

//Call to GET Method
GET();

//Get method
function GET(){
	options.method = 'GET';
	var req = http.request(options, function(response)  {
		var str = ''; 
		 response.on('data', function (chunk) { str += chunk; }); 
	  	response.on('end', function () {
	  		POST(); //calls post method
	  	 console.log(str); 
	  	}); 
	});
	req.end();
}
//Post method. Populates API
function POST(){
	options.method = 'POST';
	var req = http.request(options, function(response)  {
		var str = ''; 
		 response.on('data', function (chunk) { str += chunk; }); 
	  	response.on('end', function () {
	  		DELETE(); //Delete method call
	  	 console.log(str); 
	  	}); 
	});
	req.write(data);
	req.end();
}
//Delete
function DELETE(){
options.method = 'DELETE';
var req = http.request(options, function(response)  {
	var str = ''; 
	 response.on('data', function (chunk) { str += chunk; }); 
  	response.on('end', function () {
  		PUT(); //Put method call
  	 console.log(str); 
  	}); 
});
req.end();
}

//Put method
function PUT(){
	options.method = 'PUT';
	var req = http.request(options, function(response)  {
		var str = ''; 
		 response.on('data', function (chunk) { str += chunk; }); 
	  	response.on('end', function () {
	  		PUT_RECORD(); //Put method call. To update a record
	  	 console.log(str); 
	  	}); 
	});
	req.write(Putdata);
	req.end();
}

//Updates a record
function PUT_RECORD(){
	options.method = 'PUT';
	options.path = "/api/13";
	var req = http.request(options, function(response)  {
		var str = ''; 
		 response.on('data', function (chunk) { str += chunk; }); 
	  	response.on('end', function () {
	  		GET_RECORD(); //Get method call. To retrieve a record
	  	 console.log(str); 
	  	}); 
	});
	req.write(PutRecord);
	req.end();
}

//Gets an item
function GET_RECORD(){
	options.method = 'GET';
	options.path = "/api/10";
	var req = http.request(options, function(response)  {
		var str = ''; 
		 response.on('data', function (chunk) { str += chunk; }); 
	  	response.on('end', function () {
	  		DELETE_RECORD();//Delete a particular record
	  	 console.log(str); 
	  	}); 
	});
	req.end();
}

//Deletes an item
function DELETE_RECORD(){
	options.method = 'DELETE';
	options.path = "/api/3";
	var req = http.request(options, function(response)  {
		var str = ''; 
		 response.on('data', function (chunk) { str += chunk; }); 
	  	response.on('end', function () {
	  	 console.log(str); 
	  	}); 
	});
	req.end();
}