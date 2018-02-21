//All the different routes/screens user can route to
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import CountdownList from './components/CountdownList';
import AddCountdown from './components/AddCountdown';
import EventOverview from './components/EventOverview';
import EditCountdown from './components/EditCountdown';
import ImageGallery from './components/ImageGallery';
import Logo from './components/common/Logo';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' tabBar='hide'>
        <Scene
          key='CountdownList'
          component={CountdownList}
          navigationBarStyle={{ height: 100, paddingTop: 10, backgroundColor: '#fff', borderBottomColor: 'transparent' }}
          onRight={() => Actions.AddCountdown()}
          rightTitle={<Icon name='md-add-circle' size={50} color='#000' />}
          leftTitle={<Logo />}
          onLeft={() => { }}
          title={'Hi! James'}
          titleStyle={{ fontSize: 35 }}
          initial
        />
        <Scene
          key='AddCountdown'
          component={AddCountdown}
          title='Add a Countdown'
          headerTintColor='#000'
        />
        <Scene
          key='EditCountdown'
          component={EditCountdown}
          title='Modify Countdown'
          headerTintColor='#000'
        />
        <Scene
          key='EventOverview'
          component={EventOverview}
          headerTintColor='#fff'
          navTransparent={'true'}
        />
        <Scene
          key='ImageGallery'
          component={ImageGallery}
          title="Select an Image"
        />
      </Scene>
    </Router>
  );
};


export default RouterComponent;
