import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
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
      .then(user => { loginUserSuccess(dispatch, user); })
      .catch((err) => {
        console.log(err);
        loginUserFail(dispatch);
      });
  };
};

export const createUser = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(account => {
      firebase.database().ref('users').child(account.uid).set({ name })
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => { loginUserSuccess(dispatch, user); })
          .catch((err) => {
            console.log(err);
            loginUserFail(dispatch);
          });
      })
      .catch((err) =>{
        console.log(err);
        createUserFail(dispatch);
      })
    })
    .catch((err) => {
      console.log(err);
      createUserFail(dispatch);
    });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
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
