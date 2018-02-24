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
import Swiper from 'react-native-swiper';
import Moment from 'moment';
import ImageOverview from './ImageOverview';
import IconBar from './IconBar';
import TextOverview from './TextOverview';
import { deleteEvent } from '../actions';

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
    Actions.CountdownList();
  }

  render() {
    const { imageUrl, eventName, eventDate, eventTime, dateObject } = this.props;
    const { container, imageStyle, dotStyle, slide } = styles;

    return (
      <ScrollView style={container}>
        <StatusBar barStyle="light-content" />
        <Image
          style={imageStyle}
          source={{ uri: imageUrl }}
        />
        <Swiper
          dot={<View style={dotStyle} />}
          activeDot={<View style={styles.activeDotStyle} />}
          paginationStyle={{
            bottom: 30
          }}
          loop={false}
          height={Dimensions.get('window').height}
          width={Dimensions.get('window').width}
        >

          <View style={slide}>
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

          <View style={styles.slide}>
            <TextOverview
              eventName={eventName}
              dateObject={Moment(dateObject)}
            />
          </View>

        </Swiper>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  dotStyle: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  activeDotStyle: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  }
});

export default connect(null, { deleteEvent })(EventOverview);
