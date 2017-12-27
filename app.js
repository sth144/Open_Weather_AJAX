// import express and store in variable. Store express.express() in app variable

var express = require('express');
var app = express();
var credentials = require('./credentials.js');
var request = require('request');

// default layout is main.hbs

var handlebars = require('express-handlebars').create({defaultLayout:'main'});


// for running node server locally for development. App uses port 5000

app.set('port', (process.env.PORT || 5000));


// the app will look for all static files in public/

app.use(express.static(__dirname + '/public'));

// views is directory for all template files

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
    response.render('index');
});

app.get('/request', function(req, res) {
    var context = {};
    console.log(req.query.cityName);
    request('http://api.openweathermap.org/data/2.5/weather?q=' + req.query.cityName + '&APPID=' + credentials.owmKey + '&units=metric', handleGet);

    function handleGet(err, response, body){
        console.log('handleget')
        if(!err && response.statusCode < 400){
            context.weatherin = "Weather in";
            context.description = "Conditions: ";
            context.wind = "Wind: ";
            context.temp = "Temperature: ";
            context.deg = "&deg;C";
            context.kph = "k/h";
            context.owm = JSON.parse(body);
            console.log('success');
            res.render('index', context);
        } else {
            console.log(err);
            console.log(response.statusCode);
        }
    }
    
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});