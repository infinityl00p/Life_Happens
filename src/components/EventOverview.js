import React, { Component } from 'react';
import { ScrollView,
          View,
          Image,
          Text,
          StatusBar,
          Dimensions,
          TouchableOpacity,
          Alert
        } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { deleteEvent } from '../actions';

class EventOverview extends Component {
  onEditPress = () => {
    //edit here
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

  handleDelete = () => {
    this.props.deleteEvent(this.props.id);
    Actions.CountdownList();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.imageContainer}>
          <StatusBar
            barStyle="light-content"
          />
          <Image
            style={styles.imageStyle}
            source={{ uri: this.props.imageUrl }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.imageNameStyle}>{this.props.eventName}</Text>
            <Text style={styles.imageDateStyle}>{this.props.date} days left</Text>
          </View>
          <TouchableOpacity style={styles.editContainer}>
            <FAIcon
              name='pencil'
              size={30}
              color='#fff'
              onPress={this.onEditPress}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowContainer}>
            <Icon
              name='md-arrow-down'
              size={40}
              color='#fff'
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.trashContainer}>
            <Icon
              name='ios-trash'
              size={40}
              color='#fff'
              onPress={this.onTrashPress}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailView}>
          <View>
            <Text>{this.props.eventName}</Text>
          </View>
          <View>
            <Text style={styles.imageDateStyle}>{this.props.date} days left</Text>
          </View>
          <View>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  imageContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: null
  },
  detailsContainer: {
    flex: 1
  },
  imageStyle: {
    flex: 1
  },
  textContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 160,
    left: 30,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  imageNameStyle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '400',
    paddingBottom: 10
  },
  imageDateStyle: {
    color: '#fff',
    fontWeight: '300',
    fontSize: 20
  },
  editContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  arrowContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 100,
    right: 100,
    bottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  trashContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 10,
    bottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  detailView: {
    flex: 2,
    height: Dimensions.get('window').height
  }
};

export default connect(null, { deleteEvent })(EventOverview);
