'use strict';

require('./config');

var ses = require('node-ses');
var client = ses.createClient({
  key: process.env.aws_key,
  secret: process.env.aws_secret
});

/**
 *  Send an email
 */
module.exports = function(obj, cb) {
  client.sendemail({
    to: obj.to,
    from: 'human@futura.io',
    replyTo: obj.from,
    subject: obj.subject,
    message: obj.message,
    altText: obj.alt || ''
  }, cb);
};
