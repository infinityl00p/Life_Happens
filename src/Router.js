//All the different routes/screens user can route to
import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import CountdownList from './components/CountdownList';
import AddCountdown from './components/AddCountdown';
import EventOverview from './components/EventOverview';
import EditCountdown from './components/EditCountdown';
import ImageGallery from './components/ImageGallery';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Logo } from './components/common';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' tabBar='hide' hideNavBar>
        <Scene key="auth">
            <Scene
              key="login"
              title="Please Login"
              component={LoginForm}
            />
            <Scene
              key="signup"
              title="Create an Account"
              component={SignupForm}
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
            leftTitle={<Logo />}
            onLeft={() => { }}
            title={'Hi James!'}
            titleStyle={{
              fontSize: Platform.OS === 'ios' ? 35 : 30,
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
          />
        </Scene>

      </Scene>
    </Router>
  );
};


export default RouterComponent;
