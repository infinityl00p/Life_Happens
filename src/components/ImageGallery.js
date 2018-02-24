import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  CameraRoll,
  View,
  StyleSheet,
  TouchableHighlight,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateEventImage } from '../actions';
import { Button, CardSection } from './common';

//TODO: Add a list view here as it takes a while to load all of the images
class ImageGallery extends Component {
  constructor() {
    super();

    this.state = {
      showGallery: false,
      photos: [],
      selectedUri: '',
      selectedImageKey: null
    };
  }

  componentWillMount() {
    this.getPhotos();
  }

  onImagePress = (selectedUri, selectedImageKey) => {
    this.setState({ selectedUri, selectedImageKey });
  }

  onButtonPress = () => {
    this.props.updateEventImage(this.state.selectedUri);
    Actions.pop();
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({
        showGallery: true,
        photos: r.edges
      });
    })
    .catch((err) => {
       console.log(err);
    });
  }

  getImageStyle = (key) => {
    if (key === this.state.selectedImageKey) {
      return StyleSheet.create({
        style: {
          borderWidth: 4,
          borderRadius: 5,
          borderColor: '#007aff',
          backgroundColor: '#fff',
          marginTop: 8
        }
      });
    } return StyleSheet.create({
      style: {
        marginTop: 8
      }
    });
  }

  render() {
    if (this.state.showGallery) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
            {
              this.state.photos.map((p, i) => {
                const imageBorder = this.getImageStyle(i);

                return (
                  <TouchableHighlight style={imageBorder.style} key={i} onPress={() => this.onImagePress(p.node.image.uri, i)}>
                    <Image
                      style={styles.imageStyle}
                      source={{ uri: p.node.image.uri }}
                    />
                  </TouchableHighlight>
                );
              })
            }
            </View>
          </ScrollView>
          <CardSection style={{ height: 20 }}>
            <Button onPress={this.onButtonPress}>
              Save Image
            </Button>
          </CardSection>
        </View>
    );
    }
    return (
      <ScrollView />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  imageStyle: {
    width: Platform.OS === 'ios' ? 178 : 170,
    height: Platform.OS === 'ios' ? 178 : 170,
  }
});


export default connect(null, { updateEventImage })(ImageGallery);
