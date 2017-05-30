import React, { Component } from 'react';

class Event extends Component {
  render() {

    // Creating placeholders for information not available in the APIs.
    const placeholderImage = 'http://cdn1.indie88cdn.com/wp-content/uploads/2016/01/Indie88-Concerts-Header-1190.jpg';
    const placeholderWeekday = 'TUE';
    const placeholderDate = 'APR 25';
    const placeholderTime = '6:30 PM';

    const {details} = this.props;

    return (
      <div className="row event">
        <div className="col-xs-3 event-photo">
            <img src={placeholderImage} alt="Concert" className="img-responsive" />
        </div>
        <div className="col-xs-1 event-date">
            <span className="weekday">{placeholderWeekday}</span>
            <span className="date">{placeholderDate}</span>
        </div>
        <div className="col-xs-8 event-info">
            <p className="name">{details.name}</p>
            <p className="location">{placeholderTime + ' - ' + details.venue.name + ', ' + details.venue.city + ', ' + details.venue.state}</p>
        </div>
      </div>
    );
  }
}

export default Event;
