'use strict';

var authors = require('../models/authors.js');
var assert = require('chai').assert;

var author = {
  name: 'TJ Krusinski',
  email: 'tjkrus@foobar.com',
  password: 'password',
};

after(function(d){
  authors.delete(author.id, d);
});

describe('authors', function(){
  describe('authors#create()', function(){
    it('creates a new author', function(d){
      authors.create(author, function(err, data){
        assert.isNull(err);
        assert.isObject(data[0]);
        author = data[0];
        d();
      });
    });
  });
  describe('authors#get()', function(){
    it('gets an author', function(d){
      authors.get(author.id, d);
    });
  });
  describe('authors#getByEmail()', function(){
    it('gets an author by email', function(d){
      authors.getByEmail(author.email, d);
    });
  });
  describe('authors#update()', function(){
    it('updates an author', function(d){
      authors.update(author.id, {firstName: 'teej'}, function(err, data){
        assert.isNull(err);
        assert.equal(data[0].firstName, 'teej');
        d();
      });
    });
  });
  describe('authors#remove()', function(){
    it('removes an author', function(d){
      authors.remove(author.id, d);
    });
  });
});
