import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Logo } from '../common';
import {
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  nameChanged,
  loginUser,
  createUser,
  resetError,
  createError
} from '../../actions';
import AuthForm from '../AuthForm';

class AuthContainer extends Component {
  state = { activeForm: 'login' };

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
    if (this.state.activeForm === 'login') {
      return (
        <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}>
          <Text>Don't have an account yet?</Text>
          <TouchableOpacity
              onPress={() => {
                this.props.resetError();
                this.setState({ activeForm: 'signup' });
              }}
          >
            <Text style={{ fontWeight: '700' }}> Create One</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.activeForm === 'signup') {
      return (
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
          <Text>Woops, take me back to</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.resetError();
              this.setState({ activeForm: 'login' });
            }}
          >
            <Text style={{ fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    const email = { onChange: this.onEmailChange, value: this.props.email };
    const password = { onChange: this.onPasswordChange, value: this.props.password };
    const name = { onChange: this.onNameChange, value: this.props.name };
    const confirmPassword = {
      onChange: this.onConfirmPasswordChange,
      value: this.props.confirmPassword
    };

    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Logo iosWidth={130} androidWidth={130} />
          <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 30 }}>
            <Text style={{ fontSize: 40, color: '#bdc3c7', fontWeight: '900' }}>life</Text>
            <Text style={{ fontSize: 40, color: '#bdc3c7', fontWeight: '300' }}>happens</Text>
          </View>
        </View>

        {
        this.state.activeForm === 'login' ?
          <AuthForm
            email={email}
            password={password}
            isLoading={this.props.isLoading}
            buttonText="Login"
            onButtonPress={this.loginUser}
            errorMessage={this.props.error}
          />
          :
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
        }
        {this.renderTouchableText()}
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
    alignItems: 'center'
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
  createUser,
  resetError,
  createError
})(AuthContainer);
