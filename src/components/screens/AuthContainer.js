import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Logo } from '../common';
import {
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  nameChanged,
  loginUser,
  facebookLogin,
  googleLogin,
  createUser,
  resetError,
  createError
} from '../../actions';
import AuthForm from '../AuthForm';

class AuthContainer extends Component {
  state = { activeForm: 'signinOptions' };

  onNameChange = (name) => {
    this.props.nameChanged(name);
  }

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }

  onConfirmPasswordChange = (text) => {
    this.props.confirmPasswordChanged(text);
  }

  loginUser = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  signupUser = () => {
    const { name, email, password, confirmPassword } = this.props;

    if (this.validateSignup(name, email, password, confirmPassword)) {
      this.props.createUser({ name, email, password });
    }
  }

  validateSignup = (name, email, password, confirmPassword) => {
    const emailValid = this.validateEmail(email);

    if (!name || !email || !password || !confirmPassword) {
      this.props.createError('Please complete all fields');
      return false;
    } else if (!emailValid) {
      this.props.createError('Please enter a valid email');
      return false;
    } else if (password !== confirmPassword) {
      this.props.createError('Passwords do not match');
      return false;
    } else if (password.length < 8) {
      this.props.createError('Password must be at least 8 characters');
      return false;
    }

    return true;
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  renderTouchableText = () => {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}>
        <TouchableOpacity
            onPress={() => {
              this.props.resetError();
              this.setState({ activeForm: 'emailLogin' });
            }}
        >
          <Text style={{ fontWeight: '700' }}>Sign In</Text>
        </TouchableOpacity>
        <Text> or </Text>
        <TouchableOpacity
            onPress={() => {
              this.props.resetError();
              this.setState({ activeForm: 'emailSignup' });
            }}
        >
          <Text style={{ fontWeight: '700' }}>Sign Up</Text>
        </TouchableOpacity>
        <Text> using an email address.</Text>
      </View>
    );
  }

  renderEmailForm = () => {
    const email = { onChange: this.onEmailChange, value: this.props.email };
    const password = { onChange: this.onPasswordChange, value: this.props.password };
    const name = { onChange: this.onNameChange, value: this.props.name };
    const confirmPassword = {
      onChange: this.onConfirmPasswordChange,
      value: this.props.confirmPassword
    };

    if (this.state.activeForm === 'emailLogin') {
      return (
        <AuthForm
          email={email}
          password={password}
          isLoading={this.props.isLoading}
          buttonText="Login"
          onButtonPress={this.loginUser}
          errorMessage={this.props.error}
        />
      );
    } else if (this.state.activeForm === 'emailSignup') {
      return (
        <AuthForm
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          name={name}
          isLoading={this.props.isLoading}
          buttonText="Create and Login"
          onButtonPress={this.signupUser}
          errorMessage={this.props.error}
        />
      );
    }
  }

  renderSigninOptions = () => {
    if (this.state.activeForm === 'signinOptions') {
      return (
        <View style={{ marginTop: 140 }}>
          <Button
            raised
            large
            title='Sign In With Google'
            onPress={this.props.googleLogin}
            borderRadius={5}
            backgroundColor={'#dd4b39'}
            containerViewStyle={styles.buttonStyle}
          />
          <Button
            raised
            large
            title='Sign In With Facebook'
            onPress={this.props.facebookLogin}
            borderRadius={5}
            backgroundColor={'#3b5998'}
            containerViewStyle={styles.buttonStyle}
          />
          {this.renderTouchableText()}
        </View>
      );
    }
  }

  render() {
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
          {this.renderEmailForm()}
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
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  nameChanged,
  loginUser,
  facebookLogin,
  googleLogin,
  createUser,
  resetError,
  createError
})(AuthContainer);
