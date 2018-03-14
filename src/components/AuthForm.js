import React from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';


const AuthForm = ({
  email,
  password,
  name,
  buttonText,
  onButtonPress,
  isLoading,
  errorMessage
}) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  return (
    <Card>
      {name ?
        <CardSection>
          <Input
            label="Name"
            placeholder="John Doe"
            onChangeText={name.onChange}
            value={name.value}
          />
        </CardSection>
      :
        <View />
    }

      <CardSection>
        <Input
          label="Email"
          placeholder="email@gmail.com"
          onChangeText={email.onChange}
          value={email.value}
        />
      </CardSection>

      <CardSection>
        <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={password.onChange}
          value={password.value}
        />
      </CardSection>

      {renderError(errorMessage)}

      <CardSection>
        {
          isLoading ?
            <Spinner size="large" />
          :
            <Button onPress={onButtonPress}>
              {buttonText}
            </Button>
        }
      </CardSection>
    </Card>

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
  }
};


export default AuthForm;
