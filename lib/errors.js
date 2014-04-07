'use strict';

/**
 *  Send a 503
 */

exports.fiveOhThree = function(req, res, mess) {
  res.send(503, mess || 'There was an error');
};

/**
 *  Send a 404
 */

exports.fourOhFour = function(req, res, mess) {
  res.send(404, mess || 'Page was not found');
};
