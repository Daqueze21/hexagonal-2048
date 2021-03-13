import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,

    };
  }

  render() {
    

    return (
      <div className='App'>
        {this.state.score}      
      </div>
    );
  }
}
