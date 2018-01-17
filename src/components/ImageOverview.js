import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Helpers from '../utils/helpers';
import TimeElement from './TimeElement';


class ImageOverview extends Component {
  constructor() {
    super();

    this.state = { timeLeft: {} };
  }

  componentWillMount() {
    const diffDateObject = Helpers.getDateObject(this.props.eventDate, this.props.eventTime);
    const timeLeft = Helpers.getTimeLeft(diffDateObject);
    this.setState({ timeLeft });
  }

  componentDidMount() {
    this.forceUpdateTime = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateTime);
 }

  updateTime = () => {
    const diffDateObject = Helpers.getDateObject(this.props.eventDate, this.props.eventTime);
    const timeLeft = Helpers.getTimeLeft(diffDateObject);

    this.setState({ timeLeft });
  }


  render() {
    const { container, textContainer, nameStyle, dateStyle, timeContainer } = styles;
    const { eventName, dateObject } = this.props;

    return (
      <View style={container}>
        <View style={textContainer}>
          <Text style={dateStyle}>{Helpers.getShorthandDateTime(dateObject)}</Text>
          <Text style={nameStyle}>{eventName}</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#fff' }} />
        <View style={timeContainer}>
          <TimeElement name='days' value={this.state.timeLeft.days} />
          <TimeElement name='hours' value={this.state.timeLeft.hours} />
          <TimeElement name='minutes' value={this.state.timeLeft.minutes} />
          <TimeElement name='seconds' value={this.state.timeLeft.seconds} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 300,
    bottom: 0,
    left: 0,
    right: 0
  },
  textContainer: {
    backgroundColor: 'transparent',
    left: 40
  },
  nameStyle: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '700',
    paddingBottom: 10
  },
  dateStyle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700'
  },
  timeContainer: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  }
};

export default ImageOverview;
