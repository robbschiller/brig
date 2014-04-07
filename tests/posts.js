'use strict';

var posts = require('../models/posts');
var assert = require('chai').assert;

var postObj = {
  title: 'foo bar title',
  body: '## this is my post \n foo bar',
  author: 'foo bar author'
};

after(function(d){
  posts.delete(postObj.id, d);
});

describe('posts', function(){
  describe('posts#create()', function(){
    it('creates a new post', function(d){
      posts.create(postObj, function(err, data){
        assert.isNull(err);
        assert.isObject(data[0]);
        postObj = data[0];
        d();
      });
    });
  });
  describe('posts#getForAuthor()', function(){
    it('gets posts for an author', function(d){
      posts.getForAuthor('foo bar author', function(err, data){
        assert.isNull(err);
        assert.isObject(data[0]);
        d();
      });
    });
  });
  describe('posts#update()', function(){
    it('updates a post', function(d){
      posts.update(postObj.id, {body:'new body'}, function(err, data){
        assert.isNull(err);
        assert.isObject(data[0]);
        assert.equal(data[0].body, 'new body');
        d();
      });
    });
  });
});
