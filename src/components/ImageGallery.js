import React, { Component } from 'react';
import { Image, ScrollView, CameraRoll, View, StyleSheet } from 'react-native';

//TODO: Add a list view here as it takes a while to load all of the images
class ImageGallery extends Component {
  constructor() {
    super();

    this.state = {
      showGallery: false,
      photos: []
    };
  }

  componentWillMount() {
    this.getPhotos();
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 1000000,
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

  render() {
    if (this.state.showGallery) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
          {
            this.state.photos.map((p, i) => {
              console.log(p.node.image.uri);
              return (
                <Image
                  key={i}
                  style={styles.imageStyle}
                  source={{ uri: p.node.image.uri }}
                />
              );
            })
          }
          </View>
        </ScrollView>
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
      width: 178,
      height: 178,
      marginTop: 8,
  }
});

export default ImageGallery;
