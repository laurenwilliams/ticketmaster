import React, { Component } from 'react';
import './App.css';

import Order from './components/Order';

class App extends Component {

  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    const ordersEndpoint = 'https://tm-service.herokuapp.com/orders';
    

    fetch(ordersEndpoint)
      .then(function(response) {
        return response.json()
      }).then((json) => {
        const orderIdArray = json.map((a) => a.id);
        for (var i=0; i<10; i++) {
          const orderId = orderIdArray[i];
          const individualOrderEndpoint = 'https://tm-service.herokuapp.com/orders/' + orderId;
          fetch(individualOrderEndpoint)
            .then(function(response) {
              return response.json()
            }).then((json) => {
              const events = {...this.state.events};
              events[orderId] = json;
              this.setState({events});
            }).catch(function(ex) {
              console.log('parsing failed', ex)
            });
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
  }

  render() {
    return (
      <div className="App">
        <Order/>
      </div>
    );
  }
}

export default App;
