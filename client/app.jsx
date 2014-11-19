'use strict';

var React = require('react');
var Header = require('./comps/header.jsx');

var App = React.createClass({

  getDefaultProps: function() {
    return { };
  },

  getInitialState: function() {
    return { };
  },

  componentDidMount: function() {
  },

  render: function() {

    return (
      <main>
        <Header />
      </main>
    );
  },

});

module.exports = App;
