'use strict';

var settings = require('./config.js');
var mongo = require('mongojs');
var db = mongo(process.env.mongo, settings.collections);

module.exports = db;
