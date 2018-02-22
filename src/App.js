import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDOQoVTSvVrzSsOXc_nVfn1hiR7rFqaHiM',
      authDomain: 'lifehappens-ed24b.firebaseapp.com',
      databaseURL: 'https://lifehappens-ed24b.firebaseio.com',
      projectId: 'lifehappens-ed24b',
      storageBucket: 'lifehappens-ed24b.appspot.com',
      messagingSenderId: '567130222129'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}
