import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './src/components/Header';
import CountdownList from './src/components/CountdownList';

export default class App extends Component {
  render() {
    return (
      <View>
        <Header headerText={'Life Happens'} />
        <CountdownList />
      </View>
    );
  }
}
