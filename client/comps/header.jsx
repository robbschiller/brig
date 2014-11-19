'use strict';

var React = require('react');

var Header = React.createClass({

  getDefaultProps: function() {
    return { };
  },

  getInitialState: function() {
    return {
      classes: ['header']
    };
  },

  componentDidMount: function() {
    setTimeout(this._addClasses, 1000);
  },

  _addClasses: function() {
    this.setState({
      classes: ['header', 'animate-in']
    });  
  },

  render: function() {
    
    return (
      <header className={this.state.classes.join(' ')}>
        <h1>Hello</h1>
      </header>
    );
  },

});

module.exports = Header;
