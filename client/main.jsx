'use strict';

var React = require('react');
var App = require('./app.jsx');

React.render(
  <App name={'Hello'} />,
  document.getElementById('appContainer')
);
