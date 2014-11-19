'use strict';

var app = require(__dirname+'/../app.js');
var users = require('../controllers/users');
var auth = require('../controllers/auth');

app.get('/', users.get, function(req, res){
  if (!res.session.user) return res.render('index');
  res.render('app');
});

app.get('/signin', auth.verify('/'), function(req, res){
  res.render('signin');
});

app.post('/signin', users.get,
  auth.try, auth.makeSession, function(req, res){
  if (!res.success) {
    res.locals.invalid = true;
  };
  res.redirect('/');
});

app.get('/signup', auth.verify('/'), function(req, res){
  res.render('signup');
});

app.post('/signup', auth.verify('/'), users.create,
  auth.auto, function(req, res){
  res.redirect('/');
});

app.get('/signout', auth.remove, function(req, res){
  res.redirect('/');
});

app.get('/forgot-password', function(req, res){
  res.render('forgot-password');
});

app.get('/forgot-password/:case', function(req, res){
  res.render('recover-password');
});

app.post('/forgot-password', function(req, res){
  res.render('forgot-password');
});

app.post('/forgot-password/:case', function(req, res){
  res.render('forgot-password');
});
