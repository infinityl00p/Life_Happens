import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import Expo, { Facebook } from 'expo';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  NAME_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER_FAIL,
  CREATE_USER,
  RESET_ERROR,
  CREATE_ERROR
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const confirmPasswordChanged = (text) => {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        firebase.database().ref(`/users/${user.uid}/name`)
          .on('value', async snapshot => {
            await AsyncStorage.setItem('loggedIn', 'true');
            await AsyncStorage.setItem('type', 'email');
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            loginUserSuccess(dispatch, user, snapshot.val());
          });
      })
      .catch((err) => {
        console.log(err);
        loginUserFail(dispatch);
      });
  };
};

export const facebookLogin = (loggedIn) => async dispatch => {
  loggedIn ? autoFacebookLogin(dispatch) : manualFacebookLogin(dispatch);
};

const manualFacebookLogin = async (dispatch) => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('229888080909486', {
    permissions: ['public_profile', 'email']
  }).catch((error) => console.log(error));

  Actions.LoadingScreen();

  await AsyncStorage.setItem('fb_token', token);

  if (type === 'cancel') {
    return loginUserFail(dispatch);
  } else if (type === 'success') {
    const response = await axios.get(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
    const { name } = response.data;
    const credential = await firebase.auth.FacebookAuthProvider.credential(token);

    const { uid } = await firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log(error);
      loginUserFail(dispatch);
    });

    firebase.database().ref(`/users/${uid}`)
      .on('value', async snapshot => {
        if (snapshot.val() === null) {
          firebase.database().ref('users').child(uid).set({ name });
        }
        await AsyncStorage.setItem('loggedIn', 'true');
        await AsyncStorage.setItem('type', 'facebook');
        loginUserSuccess(dispatch, snapshot.val(), name);
      });
  }
};

const autoFacebookLogin = async (dispatch) => {
  const token = await AsyncStorage.getItem('fb_token').catch(error => {
    console.log(error);
    loginUserFail(dispatch);
  });

  const response = await axios.get(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`).catch(error => {
    console.log(error);
    removeStorage();
    loginUserFail(dispatch);
  });

  const { name } = response.data;
  const credential = await firebase.auth.FacebookAuthProvider.credential(token);

  const { uid } = await firebase.auth().signInWithCredential(credential).catch(error => {
    console.log(error);
    removeStorage();
    loginUserFail(dispatch);
  });

  firebase.database().ref(`/users/${uid}`)
    .on('value', async snapshot => {
      if (snapshot.val() === null) {
        firebase.database().ref('users').child(uid).set({ name });
      }

      loginUserSuccess(dispatch, snapshot.val(), name);
    });
};

export const googleLogin = (loggedIn) => async dispatch => {
  loggedIn ? autoGoogleLogin(dispatch) : manualGoogleLogin(dispatch);
};

const manualGoogleLogin = async (dispatch) => {
  const options = {
    behavior: 'system',
    scopes: ['profile', 'email'],
    androidClientId: '176588057111-cmk5jfsjqlkl124l5osc3l3u3ou738f1.apps.googleusercontent.com',
    iosClientId: '176588057111-lskojrnhidlvs4o5jg97soclfdrf7bu9.apps.googleusercontent.com'
  };

  const { type, idToken, user } = await Expo.Google.logInAsync(options).catch((error) => console.log(error));

  Actions.LoadingScreen();

  await AsyncStorage.setItem('google_token', idToken).catch(error => (console.log(error)));

  const { name } = user;

  if (type === 'cancel') {
    loginUserFail(dispatch);
  } else if (type === 'success') {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

    const { uid } = await firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error);
        return loginUserFail(dispatch);
    });

    firebase.database().ref(`/users/${uid}`)
    .on('value', async snapshot => {
      if (snapshot.val() === null) {
        firebase.database().ref('users').child(uid).set({ name });
      }

      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('type', 'google');

      return loginUserSuccess(dispatch, snapshot.val(), snapshot.val().name);
    });
  }
};

const autoGoogleLogin = async (dispatch) => {
  const token = await AsyncStorage.getItem('google_token').catch(error => {
    console.log(error);
    loginUserFail(dispatch);
  });

  const credential = await firebase.auth.GoogleAuthProvider.credential(token);

  const { uid } = await firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log(error);
      loginUserFail(dispatch);
  });


  firebase.database().ref(`/users/${uid}`)
    .on('value', async snapshot => {
      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('type', 'google');

      return loginUserSuccess(dispatch, snapshot.val(), snapshot.val().name);
    });
};

export const createUser = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(account => {
      firebase.database().ref('users').child(account.uid).set({ name })
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            loginUserSuccess(dispatch, user, name);
          })
          .catch((err) => {
            console.log(err);
            loginUserFail(dispatch);
          });
      })
      .catch((err) => {
        console.log(err);
        createUserFail(dispatch);
      });
    })
    .catch((err) => {
      console.log(err);
      createUserFail(dispatch);
    });
  };
};

const loginUserSuccess = (dispatch, user, name) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main({ title: `Hi ${name.split(' ')[0]}` });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};


const createUserFail = (dispatch) => {
  dispatch({
    type: CREATE_USER_FAIL
  });
};

export const resetError = () => {
  return {
    type: RESET_ERROR
  };
};

export const createError = (text) => {
  return {
    type: CREATE_ERROR,
    payload: text
  };
};

const removeStorage = async () => {
  await AsyncStorage.removeItem('loggedIn');
  await AsyncStorage.removeItem('google_token');
  await AsyncStorage.removeItem('fb_token');
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('password');
}