import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
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
          .on('value', snapshot => {
            loginUserSuccess(dispatch, user, snapshot.val());
          });
      })
      .catch((err) => {
        console.log(err);
        loginUserFail(dispatch);
      });
  };
};

export const facebookLogin = () => async dispatch => {
  await AsyncStorage.removeItem('user_credential');
  const credential = await AsyncStorage.getItem('user_crediential');
  if (credential) {
    //TODO: GET NAME AND USER
    loginUserSuccess(dispatch);
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('598956890453300', {
    permissions: ['public_profile', 'email']
  });

  if (type === 'cancel') {
    return loginUserFail(dispatch);
  }

  if (type === 'success') {
    const response = await axios.get(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
    const { name, email } = response.data;
    console.log(token);
    //check if email exists in firebase
      //if it doesn't
        //sign in with credential
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        try {
          await firebase.auth().signInWithCredential(credential);
        } catch (error) {
          console.log(error);
        }
        //add name field to user account

        await AsyncStorage.setItem('user_crediential', credential);
      //if it does, sign in with firebase credentials

      //loginusersuccess

    loginUserFail(dispatch);
  }
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
