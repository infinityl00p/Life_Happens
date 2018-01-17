import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { eventNameChanged, eventDateChanged, eventTimeChanged, editEvent } from '../actions';
import Card from './Card';
import CardSection from './CardSection';
import Input from './Input';
import Button from './Button';


class EditCountdown extends Component {
  componentWillMount() {
    this.props.eventNameChanged(this.props.initialName);
    this.props.eventDateChanged(this.props.initialDate);
    this.props.eventTimeChanged(this.props.initialTime);
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
    const { id, eventDate, imageUrl, eventName, eventTime } = this.props;

    if (eventName !== '' && eventDate !== null) {
      this.props.editEvent({ id, eventName, eventDate, eventTime, imageUrl });
      this.props.eventNameChanged('');
      this.props.eventDateChanged(null);
      this.props.eventTimeChanged('');

      Actions.pop({ refresh: { id, imageUrl, eventName, eventDate, eventTime } });
    }
  }

  render() {
    return (
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
        <View style={styles.containerStyle}>
          <Text style={styles.labelStyle}>Date</Text>
          <DatePicker
            style={{ width: 210 }}
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            date={this.props.eventDate}
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
          <View style={styles.containerStyle}>
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
        <Button onPress={this.onSubmit}>
         Update
        </Button>
      </CardSection>
    </Card>
    );
  }
}

const styles = {
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};


const mapStateToProps = state => {
  return {
    eventName: state.EventFields.eventName,
    eventDate: state.EventFields.eventDate,
    eventTime: state.EventFields.eventTime
  };
};

export default connect(mapStateToProps,
  { eventNameChanged, eventDateChanged, eventTimeChanged, editEvent })(EditCountdown);
