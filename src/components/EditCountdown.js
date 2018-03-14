import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  updateEventName,
  updateEventDate,
  updateEventTime,
  updateEventImage,
  resetCountdownFields,
  editEvent
} from '../actions';
import { CountdownForm } from './common';


class EditCountdown extends Component {
  componentWillMount() {
    this.props.updateEventName(this.props.initialName);
    this.props.updateEventDate(this.props.initialDate);
    this.props.updateEventTime(this.props.initialTime);
    this.props.updateEventImage(this.props.imageUrl);
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
    const { id, eventDate, imageUri, eventName, eventTime } = this.props;

    if (eventName !== '' && eventDate !== null) {
      this.props.editEvent({
        id,
        name: eventName,
        date: eventDate,
        time: eventTime,
        image: imageUri
      });
      this.props.resetCountdownFields();
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
          imageUri={this.props.imageUri}
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
    updateEventImage,
    resetCountdownFields,
    editEvent
  }
)(EditCountdown);
