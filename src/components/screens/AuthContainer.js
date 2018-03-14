import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Logo } from '../common';
import {
  emailChanged,
  passwordChanged,
  nameChanged,
  loginUser,
  createUser,
  resetError
} from '../../actions';
import AuthForm from '../AuthForm';

class AuthContainer extends Component {
  state = { activeForm: 'login' };

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }

  onNameChange = (name) => {
    this.props.nameChanged(name);
  }

  loginUser = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  signupUser = () => {
    const { name, email, password } = this.props;

    this.props.createUser({ name, email, password });
  }

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
        <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}>
          <Text>Woops, take me back to</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.resetError();
              this.setState({ activeForm: 'login' });
            }}
          >
            <Text style={{ fontWeight: '700' }}> login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    const email = { onChange: this.onEmailChange, value: this.props.email }
    const password = { onChange: this.onPasswordChange, value: this.props.password }
    const name = { onChange: this.onNameChange, value: this.props.name }

    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Logo iosWidth={130} androidWidth={150} />
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
    name: state.auth.name,
    error: state.auth.error,
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  nameChanged,
  loginUser,
  createUser,
  resetError
})(AuthContainer);
