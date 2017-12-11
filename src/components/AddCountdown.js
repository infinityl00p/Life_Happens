import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { eventNameChanged, eventDateChanged, addEvent } from '../actions';
import Card from './Card';
import CardSection from './CardSection';
import Input from './Input';
import Button from './Button';


class AddCountdown extends Component {
  onEventNameChange = (text) => {
    this.props.eventNameChanged(text);
  }

  onDateChange = (date) => {
    this.props.eventDateChanged(date);
  }

  onSubmit = () => {
    if (this.props.eventName !== '' && this.props.eventDate !== null) {
      this.props.addEvent({ name: this.props.eventName, date: this.props.eventDate });
      //TODO: This should be changed automatically
      this.props.eventNameChanged('');
      this.props.eventDateChanged(null);
      Actions.pop();
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
          <Button onPress={this.onSubmit}>
           Add Event
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
    eventName: state.addEventReducer.eventName,
    eventDate: state.addEventReducer.eventDate,
  };
};

export default connect(mapStateToProps,
  { eventNameChanged, eventDateChanged, addEvent })(AddCountdown);
