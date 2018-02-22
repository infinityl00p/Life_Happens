import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { eventNameChanged, eventDateChanged, eventTimeChanged, addEvent } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class AddCountdown extends Component {
  componentWillMount() {
    this.props.eventNameChanged('');
    this.props.eventDateChanged(null);
  }

  onEventNameChange = (text) => {
    this.props.eventNameChanged(text);
  }

  onDateChange = (date) => {
    this.props.eventDateChanged(date);
  }

  onTimeChange = (time) => {
    this.props.eventTimeChanged(time);
  }

  onSubmit = () => {
    if (this.props.eventName !== '' && this.props.eventDate !== null) {
      this.props.addEvent({
        name: this.props.eventName,
        date: this.props.eventDate,
        time: this.props.eventTime
      });
      //TODO: This should be changed automatically
      this.props.eventNameChanged('');
      this.props.eventDateChanged(null);
      this.props.eventTimeChanged('');
      Actions.pop();
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="New Years"
              onChangeText={this.onEventNameChange}
              value={this.props.eventName}
            />
          </CardSection>

          <CardSection>
            <View style={styles.rowStyle}>
              <Text style={styles.labelStyle}>Date</Text>
              <DatePicker
                style={{ width: 210 }}
                mode="date"
                placeholder="Select Date"
                format="YYYY-MM-DD"
                date={this.props.eventDate || null}
                minDate={new Date()}
                maxDate="2100-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateText: {
                    color: '#000',
                    fontSize: 18,
                    lineHeight: 23,
                    flex: 2,
                    paddingTop: 8
                  },
                  placeholderText: {
                    color: '#bfbfbf',
                    fontSize: 18
                  },
                  dateInput: {
                    borderColor: 'transparent',
                    alignItems: 'flex-start',
                  }
                }}
                onDateChange={this.onDateChange}
              />
            </View>
          </CardSection>

          <CardSection>
            <View style={styles.rowStyle}>
              <Text style={styles.labelStyle}>Time</Text>
              <DatePicker
                style={{ width: 210 }}
                date={this.props.eventTime}
                mode="time"
                placeholder="Select Time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateText: {
                    color: '#000',
                    fontSize: 18,
                    lineHeight: 23,
                    flex: 2,
                    paddingTop: 8
                  },
                  placeholderText: {
                    color: '#bfbfbf',
                    fontSize: 18
                  },
                  dateInput: {
                    borderColor: 'transparent',
                    alignItems: 'flex-start',
                  }
                }}
              onDateChange={this.onTimeChange}
              />
            </View>
          </CardSection>

          <CardSection>
            <Button
              label="Image"
              onPress={() => {
                Actions.ImageGallery()
              }}
            >
              Select a Background
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onSubmit}>
            Add Event
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    height: Dimensions.get('window').height
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  rowStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});


const mapStateToProps = state => {
  return {
    eventName: state.EventFields.eventName,
    eventDate: state.EventFields.eventDate,
    eventTime: state.EventFields.eventTime
  };
};

export default connect(mapStateToProps,
  { eventNameChanged, eventDateChanged, eventTimeChanged, addEvent })(AddCountdown);
