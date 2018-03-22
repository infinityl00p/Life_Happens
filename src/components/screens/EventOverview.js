import React, { Component } from 'react';
import { ScrollView,
          View,
          StatusBar,
          Dimensions,
          Alert,
          Image,
          StyleSheet
        } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';
import ImageOverview from './ImageOverview';
import IconBar from '../IconBar';
import { Overlay } from '../common';
import { deleteEvent } from '../../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class EventOverview extends Component {
  onEditPress = () => {
    this.handleEdit();
  }

  onTrashPress = () => {
    Alert.alert(
      'Are you sure you want to delete this event?',
      'Cannot be undone',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Delete', onPress: () => this.handleDelete() }
      ]
    );
  }

  handleEdit = () => {
    const { id, eventName, eventDate, eventTime, imageUrl } = this.props;

    Actions.EditCountdown({
      id,
      initialName: eventName,
      initialDate: eventDate,
      initialTime: eventTime,
      imageUrl
    });
  }

  handleDelete = () => {
    this.props.deleteEvent(this.props.id);
  }

  render() {
    const { imageUrl, eventName, eventDate, eventTime, dateObject } = this.props;
    const { container, imageStyle, overview } = styles;

    return (
      <ScrollView style={container}>
        <StatusBar barStyle="light-content" />
        <Image
          style={imageStyle}
          source={{ uri: imageUrl }}
        />
        <Overlay backgroundColor={'black'} opacity={0.4} />

          <View style={overview}>
            <ImageOverview
              eventName={eventName}
              eventDate={eventDate}
              dateObject={Moment(dateObject)}
              eventTime={eventTime}
            />
            <IconBar
              onEditPress={this.onEditPress}
              onTrashPress={this.onTrashPress}
            />
          </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  overview: {
    flex: 1,
    backgroundColor: 'transparent',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }
});

export default connect(null, { deleteEvent })(EventOverview);
