//All the different routes/screens user can route to
import React from 'react';
import {
  Platform,
  Text,
} from 'react-native';

import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import CountdownList from './components/CountdownList';
import AddCountdown from './components/AddCountdown';
import EventOverview from './components/screens/EventOverview';
import EditCountdown from './components/EditCountdown';
import ImageGallery from './components/screens/ImageGallery';
import AuthContainer from './components/screens/AuthContainer';
import LoadingScreen from './components/screens/LoadingScreen';
import EmailAuth from './components/screens/EmailAuth';
import { Logo } from './components/common';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' tabBar='hide' hideNavBar>
        <Scene key='auth' hideNavBar type={ActionConst.RESET}>

          <Scene
            key='AuthContainer'
            component={AuthContainer}
          />
          <Scene
            key='EmailAuth'
            component={EmailAuth}
          />
          <Scene
            key='LoadingScreen'
            component={LoadingScreen}
          />
        </Scene>

        <Scene key='main' type={ActionConst.RESET}>

          <Scene
            key='CountdownList'
            component={CountdownList}
            navigationBarStyle={{
              height: 100,
              paddingTop: Platform.os === 'ios' ? 10 : 20,
              backgroundColor: '#fff',
              borderBottomColor: 'transparent'
            }}
            onRight={() => Actions.AddCountdown()}
            // rightTitle={<Ionicons name="md-checkmark-circle" size={50} color="#000" />}
            rightTitle={<Text>Add an Event</Text>}
            rightButtonStyle={{ right: 0 }}
            leftTitle={<Logo iosWidth={70} androidWidth={180} iosHeight={70} androidHeight={180} />}
            onLeft={() => { }}
            titleStyle={{
              fontSize: Platform.OS === 'ios' ? 30 : 25,
              alignSelf: 'flex-start',
              color: '#bdc3c7',
              fontWeight: '400'
            }}
            initial
          />
          <Scene
            key='AddCountdown'
            component={AddCountdown}
            title='Add a Countdown'
            headerTintColor='#fff'
            titleStyle={{ color: '#fff' }}
            navTransparent={'true'}
          />
          <Scene
            key='EditCountdown'
            component={EditCountdown}
            title='Modify Countdown'
            headerTintColor='#fff'
            titleStyle={{ color: '#fff' }}
            navTransparent={'true'}
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
