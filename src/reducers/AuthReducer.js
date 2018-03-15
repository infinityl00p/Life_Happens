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
  CREATE_ERROR,
  RESET_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  user: null,
  error: '',
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmPassword: action.payload };

    case NAME_CHANGED:
      return { ...state, name: action.payload };

    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };

    case LOGIN_USER_FAIL:
      return { ...state, error: 'Unable to login. Please try again.', isLoading: false };

    case LOGIN_USER:
      return { ...state, isLoading: true };

    case CREATE_USER_FAIL:
      return { ...state, error: 'Create User Failed. Please try again', isLoading: false };

    case CREATE_USER:
      return { ...state, isLoading: true };

    case CREATE_ERROR:
      return { ...state, error: action.payload };

    case RESET_ERROR:
      return { ...state, error: '' };

    default:
      return state;
  }
};
