import React, { Component } from 'react';
import { ScrollView,
          View,
          StatusBar,
          Dimensions,
          Alert,
          Image
        } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
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
    const { id, eventName, eventDate, imageUrl } = this.props;

    Actions.EditCountdown({
      id,
      initialName: eventName,
      initialDate: eventDate,
      imageUrl
    });
  }

  handleDelete = () => {
    this.props.deleteEvent(this.props.id);
    Actions.CountdownList();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.imageStyle}
          source={{ uri: this.props.imageUrl }}
        />
        <Swiper
          dot={<View style={styles.dotStyle} />}
          activeDot={<View style={styles.activeDotStyle} />}
          paginationStyle={{
            bottom: 70
          }}
          loop={false}
        >

          <View style={styles.slide}>
            <ImageOverview
              imageUrl={this.props.imageUrl}
              eventName={this.props.eventName}
              eventDate={this.props.eventDate}
            />
            <IconBar
              onEditPress={this.onEditPress}
              onTrashPress={this.onTrashPress}
            />
          </View>

          <View style={styles.slide}>
            <TextOverview
              eventName={this.props.eventName}
              eventDate={this.props.eventDate}
            />
          </View>

        </Swiper>

      </ScrollView>
    );
  }
}

const styles = {
  imageContainer: {
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
};

export default connect(null, { deleteEvent })(EventOverview);
