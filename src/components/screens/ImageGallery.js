import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  CameraRoll,
  View,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { updateEventImage } from '../../actions';
import { CardSection } from './../common';
import { images } from '../../stock_images/image_list';

//TODO: Add a list view here as it takes a while to load all of the images
class ImageGallery extends Component {
  constructor() {
    super();

    this.state = {
      stockPhotos: [],
      galleryPhotos: [],
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

  getPhotos = async () => {
    if (this.props.fromGallery) {
      const { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);

      if (status) {
        CameraRoll.getPhotos({
          first: 30,
          assetType: 'Photos',
        })
          .then(r => {
            this.setState({
              galleryPhotos: r.edges
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      this.setState({
        stockPhotos: images
      });
    }
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

  renderImages = () => {
    const photos = this.props.fromGallery ? this.state.galleryPhotos : this.state.stockPhotos;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          {
            photos.map((p, i) => {
              const imageBorder = this.getImageStyle(i);
              const uri = this.props.fromGallery ? p.node.image.uri : p;

              return (
                <TouchableHighlight
                  style={imageBorder.style}
                  key={i}
                  onPress={() => this.onImagePress(uri, i)}
                >
                  <Image
                    style={styles.imageStyle}
                    source={{ uri }}
                  />
                </TouchableHighlight>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }

  render() {
    if (this.state.stockPhotos.length || this.state.galleryPhotos.length) {
      return (
        <View style={{ flex: 1 }}>
          {this.renderImages()}
          <View style={{ backgroundColor: '#fff', padding: 5, alignItems: 'center' }}>
            <Button
              raised
              onPress={this.onButtonPress}
              containerViewStyle={{ width: '100%' }}
              fontWeight={'700'}
              fontSize={15}
              borderRadius={5}
              backgroundColor={'#26de81'}
              title='Save Image'
            />
          </View>
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
