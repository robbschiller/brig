'use strict';

require('./lib/config.js');

var express = require('express');
var auth = require('./controllers/auth');
var app = module.exports = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(auth.setCookie());
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(auth.get());

app.configure('development', function(){
  app.use(express.logger('dev'));
});

app.listen(process.env.PORT, function(){
  console.log('server listening on 127.0.0.1:%d', process.env.PORT);
  require('./routes');
});
