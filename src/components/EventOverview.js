import React, { Component } from 'react';
import { ScrollView,
          View,
          StatusBar,
          Dimensions,
          Alert
        } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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
      <ScrollView>

        <View>
          <StatusBar
            barStyle="light-content"
          />
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

        <View style={styles.detailView}>
          <TextOverview
            eventName={this.props.eventName}
            eventDate={this.props.eventDate}
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = {
  detailView: {
    flex: 2,
    height: Dimensions.get('window').height
  }
};

export default connect(null, { deleteEvent })(EventOverview);
