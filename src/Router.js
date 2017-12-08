//All the different routes/screens user can route to
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import CountdownList from './components/CountdownList';
import AddCountdown from './components/AddCountdown';
import Icon from 'react-native-vector-icons/Ionicons';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' tabBar='hide'>
        <Scene
          onRight={() => Actions.addCountdown()}
          rightTitle={<Icon name='ios-add' size={40} color='#000' />}
          key='countdownList'
          component={CountdownList}
          title='Your Countdowns'
          rightButtonStyle={{ top: 5 }}
          initial
        />
        <Scene
          key='addCountdown'
          component={AddCountdown}
          title='Add a Countdown'
          headerTintColor='#000'
        />
      </Scene>
    </Router>
  );
};


export default RouterComponent;
