import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from './src/containers/Header'

export default class App extends Component {
  render() {
    return (
      <View>
        <Header headerText={'Life Happens'} />
      </View>
    );
  }
}
