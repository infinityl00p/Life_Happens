//All the different routes/screens user can route to
import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CountdownList from './components/CountdownList';
import AddCountdown from './components/AddCountdown';
import EventOverview from './components/screens/EventOverview';
import EditCountdown from './components/EditCountdown';
import ImageGallery from './components/screens/ImageGallery';
import AuthContainer from './components/screens/AuthContainer';
import { Logo } from './components/common';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' tabBar='hide' hideNavBar>
        <Scene key='auth' hideNavBar>

          <Scene
            key='AuthContainer'
            component={AuthContainer}
          />

        </Scene>

        <Scene key='main'>

          <Scene
            key='CountdownList'
            component={CountdownList}
            navigationBarStyle={{
              height: 100,
              paddingTop: 10,
              backgroundColor: '#fff',
              borderBottomColor: 'transparent'
            }}
            onRight={() => Actions.AddCountdown()}
            rightTitle={<Icon name='md-add-circle' size={50} color='#000' />}
            rightButtonStyle={{ right: 0 }}
            leftTitle={<Logo iosWidth={60} androidWidth={140} />}
            onLeft={() => { }}
            title={`Your Countdowns`}
            titleStyle={{
              fontSize: Platform.OS === 'ios' ? 25 : 20,
              alignSelf: 'flex-start'
            }}
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
            rightTitle="From Gallery"
            onRight={() => {
              Actions.pop();
              Actions.ImageGallery({ fromGallery: true });
            }}
          />
        </Scene>

      </Scene>
    </Router>
  );
};

export default RouterComponent;