import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './src/containers/Header';
import CountdownList from './src/containers/CountdownList';

class App extends Component {
  render() {
    return (
      <View>
        <Header headerText={'Life Happens'} />
        <CountdownList />
      </View>
    );
  }
}

export default App;
