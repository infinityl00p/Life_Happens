import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Logo } from '../common';
import {
  facebookLogin,
  googleLogin,
  loginUser
} from '../../actions';

class AuthContainer extends Component {
  state = { checkingAuth: null };

  componentWillMount() {
    AsyncStorage.getItem('loggedIn').then(response => console.log(response))
    AsyncStorage.getItem('loggedIn').then(loggedIn => {
      if (loggedIn) {
        this.setState({ checkingAuth: true });
        this.handleLoggedIn();
      } else {
        this.setState({ checkingAuth: false });
      }
    }).catch((error) => console.log(error));
  }

  componentWillReceiveProps() {
    this.setState({ checkingAuth: false });
  }

  handleLoggedIn = async () => {
    let email;
    let password;
    const accountType = await AsyncStorage.getItem('type');
    switch (accountType) {
      case 'email':
        email = await AsyncStorage.getItem('email');
        password = await AsyncStorage.getItem('password');
        if (email && password) {
          this.props.loginUser({ email, password });
        }
        break;

      case 'facebook':
        this.props.facebookLogin(true);
        break;

      case 'google':
        this.props.googleLogin(true);
        break;

      default:
        break;
    }
  }

  loginUser = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderTouchableText = () => {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}>
        <TouchableOpacity
            onPress={() => {
              Actions.EmailAuth({ activeForm: 'login' });
            }}
        >
          <Text style={{ fontWeight: '700' }}>Sign In</Text>
        </TouchableOpacity>
        <Text> or </Text>
        <TouchableOpacity
            onPress={() => {
              Actions.EmailAuth({ activeForm: 'signup' });
            }}
        >
          <Text style={{ fontWeight: '700' }}>Sign Up</Text>
        </TouchableOpacity>
        <Text> using an email address.</Text>
      </View>
    );
  }

  renderSigninOptions = () => {
    return (
      <View style={{ marginTop: 140 }}>
        <Button
          raised
          large
          title='Sign In With Google'
          onPress={() => this.props.googleLogin(false)}
          borderRadius={5}
          backgroundColor={'#dd4b39'}
          containerViewStyle={styles.buttonStyle}
        />
        <Button
          raised
          large
          title='Sign In With Facebook'
          onPress={() => this.props.facebookLogin(false)}
          borderRadius={5}
          backgroundColor={'#3b5998'}
          containerViewStyle={styles.buttonStyle}
        />
        {this.renderTouchableText()}
      </View>
    );
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#45aaf2" />
        </View>
      );
    }
    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Logo
            iosHeight={180}
            iosWidth={150}
            androidHeight={180}
            androidWidth={150}
            withText
          />
        </View>

        <View>
          {this.renderSigninOptions()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  headerStyle: {
    position: 'absolute',
    alignItems: 'center',
    top: 70,
    left: 0,
    right: 0
  },
  buttonStyle: {
    margin: 10
  }
});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    confirmPassword: state.auth.confirmPassword,
    name: state.auth.name,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
    checkingAuth: true
  };
};

export default connect(mapStateToProps, {
  facebookLogin,
  googleLogin,
  loginUser
})(AuthContainer);
