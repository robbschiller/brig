'use strict';

var config = require('yaml-config');
var _ = require('underscore');
var settings = config.readConfig('./config.yaml');

_.extend(process.env, settings);

module.exports = settings;
