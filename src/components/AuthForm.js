import React from 'react';
import { View, Text, LayoutAnimation, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const AuthForm = ({
  email,
  password,
  confirmPassword,
  name,
  buttonText,
  onButtonPress,
  isLoading,
  errorMessage
}) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  const { subContainerStyle, inputStyle, buttonContainerStyle } = styles;

  return (
    <View style={{ marginLeft: 15, marginRight: 15 }}>
      {name ?
        <View style={subContainerStyle}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder={'Name'}
            style={inputStyle}
            value={name.value}
            onChangeText={name.onChange}
          />
        </View>
      :
        <View />
    }

      <View style={subContainerStyle}>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder={'Email'}
          style={inputStyle}
          value={email.value}
          onChangeText={email.onChange}
        />
      </View>

      <View style={subContainerStyle}>
        <TextInput
          secureTextEntry
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder={'Password'}
          style={inputStyle}
          value={password.value}
          onChangeText={password.onChange}
        />
      </View>
      { name ?
          <View style={subContainerStyle}>
            <TextInput
              secureTextEntry
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder={'Confirm Password'}
              style={inputStyle}
              value={confirmPassword.value}
              onChangeText={confirmPassword.onChange}
            />
          </View>
          :
          <View />
      }

      { renderError(errorMessage) }
        <View style={buttonContainerStyle}>
          <Button
            loading={isLoading}
            raised
            containerViewStyle={{width: '100%'}}
            fontWeight={'700'}
            fontSize={18}
            disabled={isLoading}
            borderRadius={5}
            title={buttonText}
            onPress={onButtonPress}
            backgroundColor={'#45aaf2'}
          />
        </View>

    </View>

  );
};

const renderError = (errorMessage) => {
  if (errorMessage) {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Text style={styles.errorTextStyle}>
          {errorMessage}
        </Text>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  inputStyle: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    textAlign: 'center',
    color: '#778ca3',
    fontWeight: '700'
  },
  subContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#d1d8e0',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  buttonContainerStyle: {
    marginTop: 8,
    alignItems: 'center'
  }
};


export default AuthForm;
