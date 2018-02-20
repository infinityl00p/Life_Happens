import React, { Component } from 'react';
import { Image, ScrollView, CameraRoll, View } from 'react-native';

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
      groupTypes: 'All',
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({
        showGallery: true,
        photos: r.edges
      });
    })
    .catch((err) => {
       //Error Loading Images
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

const styles = {
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
};

export default ImageGallery;
