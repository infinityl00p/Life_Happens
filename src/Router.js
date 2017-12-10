//All the different routes/screens user can route to
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import CountdownList from './components/CountdownList';
import AddCountdown from './components/AddCountdown';
import EventOverview from './components/EventOverview';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' tabBar='hide'>
        <Scene
          key='CountdownList'
          component={CountdownList}
          title='Your Countdowns'
          onRight={() => Actions.AddCountdown()}
          rightTitle={<Icon name='ios-add' size={40} color='#000' />}
          rightButtonStyle={{ top: 5 }}
          initial
        />
        <Scene
          key='AddCountdown'
          component={AddCountdown}
          title='Add a Countdown'
          headerTintColor='#000'
        />
        <Scene
          key='EventOverview'
          component={EventOverview}
          title='Your Event'
          headerTintColor='#fff'
          navTransparent={true}
          rightTitle={<Icon name='ios-trash' size={30} color='#fff' />}
          rightButtonStyle={{ top: 5 }}
          onRight={() => console.log("Are you sure you want to remove")}
        />
      </Scene>
    </Router>
  );
};


export default RouterComponent;
