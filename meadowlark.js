var express = require('express');

var app = express();

//set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home');
});

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

app.get('/about', function(req,res){
	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about', {fortune : randomFortune});
});

//404 - catch all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

//500 Error Handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

/*
app.get('/', function(req, res){
	res.type('text/plain');
	res.send('Meadowlark Travels');
});

app.get('/about', function(req,res){
	res.type('text/plain');
	res.send('About Meadowlark Travels...')
});

//Custom 404 page
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found!!')
});

//Custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Internal Server Error')
});
*/

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; Press Ctrl+C to terminate');
});