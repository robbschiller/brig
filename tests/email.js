'use strict';

var assert = require('chai').assert;
var send = require('../lib/email');

describe('email sending', function(){
  describe('email()', function(){
    it('sends an email', function(d){
      send({
        to: 'tjkrus@gmail.com',
        from: 'tjkrus@gmail.com',
        subject: 'Human test',
        message: 'Human message',
      }, d);
    });
  });
});
