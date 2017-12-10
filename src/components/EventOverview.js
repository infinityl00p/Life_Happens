import React, { Component } from 'react';
import { ScrollView, View, Image, Text, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class EventOverview extends Component {
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
          <View style={styles.iconContainer}>
            <Icon
              name='md-arrow-down'
              size={40}
              color='#fff'
            />
          </View>
        </View>
        <View style={styles.detailView}>
          <View style={styles.nameStyle}>
            <Text>{this.props.eventName}</Text>
          </View>
          <View style={styles.dateStyle}>
            <Text style={styles.imageDateStyle}>{this.props.date} days left</Text>
          </View>
          <View style={styles.detailStyle}>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = {
  imageContainer: {
    flex: 1,
    height: Dimensions.get("window").height,
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
  iconContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  detailView: {
    flex: 2,
    height: Dimensions.get("window").height
  },
  nameStyle: {
    paddingTop: 20,
    fontSize: 40
  },
  dateStyle: {
    paddingTop: 20,
    fontSize: 40
  },
  detailStyle: {

  }
};


export default EventOverview;
