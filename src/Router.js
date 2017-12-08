//All the different routes/screens user can route to
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import CountdownList from './components/CountdownList';
import AddCountdown from './components/AddCountdown';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          onRight={() => Actions.addCountdown()}
          rightTitle="Add"
          key="countdownList"
          component={CountdownList}
          title="Your Countdowns"
          initial
        />
        <Scene
          key="addCountdown"
          component={AddCountdown}
          title="Add a Countdown"
        />
      </Scene>
    </Router>
  );
};


export default RouterComponent;
