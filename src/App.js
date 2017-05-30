import React, { Component } from 'react';
import './App.css';

import Event from './components/Event';

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
      .then((response) => {
        return response.json()
      }).then((orders) => {
        const eventIdArray = orders.map((a) => a.event_id);
        // Get details for the first 10 events
        for (let i=0; i<10; i++) {
          const eventId = eventIdArray[i];
          const individualEventEndpoint = 'https://tm-events-api.herokuapp.com/event/' + eventId;
          fetch(individualEventEndpoint)
            .then((response) => {
              return response.json()
            }).then((eventInfo) => {
              const events = {...this.state.events};
              events[eventId] = eventInfo;
              this.setState({events});
            }).catch((error) => {
              console.log('parsing failed', error)
            });
        }
      }).catch((error) => {
        console.log('parsing failed', error)
      });
  }

  render() {
    return (
      <div className="container">
        <h1>My Events</h1>
        {
          Object
           .keys(this.state.events)
           .map(key => <Event key={key} index={key} details={this.state.events[key]} />)
        }
      </div>
    );
  }
}

export default App;
