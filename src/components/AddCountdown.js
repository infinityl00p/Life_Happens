import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  updateEventName,
  updateEventDate,
  updateEventTime,
  resetCountdownFields,
  addEvent
} from '../actions';
import { CountdownForm } from './common';

class AddCountdown extends Component {
  componentWillUnmount() {
    this.props.resetCountdownFields();
  }

  onEventNameChange = (text) => {
    this.props.updateEventName(text);
  }

  onDateChange = (date) => {
    this.props.updateEventDate(date);
  }

  onTimeChange = (time) => {
    this.props.updateEventTime(time);
  }

  onSubmit = () => {
    const { eventName, eventDate, eventTime, imageUri } = this.props;

    if (eventName !== '' && eventDate !== null) {
      this.props.addEvent({
        name: eventName,
        date: eventDate,
        time: eventTime,
        image: imageUri
      });
      //TODO: This should be changed automatically
      this.props.resetCountdownFields();
      Actions.pop();
    }
  }

  render() {
    return (
      <View>
        <CountdownForm
          onNameChange={this.onEventNameChange}
          name={this.props.eventName}
          onDateChange={this.onDateChange}
          date={this.props.eventDate}
          onTimeChange={this.onTimeChange}
          time={this.props.eventTime}
          onSubmit={this.onSubmit}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventName: state.EventFields.eventName,
    eventDate: state.EventFields.eventDate,
    eventTime: state.EventFields.eventTime,
    imageUri: state.EventFields.imageUri
  };
};

export default connect(mapStateToProps,
  {
    updateEventName,
    updateEventDate,
    updateEventTime,
    resetCountdownFields,
    addEvent
  }
)(AddCountdown);
