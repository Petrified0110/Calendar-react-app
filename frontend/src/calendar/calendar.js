import React from 'react';
import { Calendar, Views } from 'react-big-calendar';
import { useHistory, Link } from 'react-router-dom';
import * as dates from './dates';
import {getUserEvents} from '../event/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../calendar/calendar.css';

let allViews = Object.keys(Views).map(k => Views[k]);

let history;

function hist(event){
  history.push(`/viewevent?event=${JSON.stringify(event)}&id=${event.id}`);
}

const RedirectBasic = () => {
  history = useHistory();
  return (<Link to={'/viewevent'}/>);
}

class Basic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: null
    };
  }

  componentDidMount() {
    getUserEvents().then(evs => {
      this.setState({events: evs});
      return;
    });
  }

  render() {
    
    return (
      <div> 
        <RedirectBasic/>
        {this.state.events ? <Calendar
        events={this.state.events}
        views={allViews}
        step={60}
        showMultiDayTimes
        max={dates.add(dates.endOf(new Date(2025, 17, 1), 'day'), -1, 'hours')}
        defaultDate={new Date()}
        culture="ro"
        localizer={this.props.localizer}
        onDoubleClickEvent={(event) => hist(event)}
      />
    : <p>Loading</p>}
    </div>);
  };
};


export default Basic