import { Map } from 'immutable';
import { RECEIVE_REGISTER, RECEIVE_LOGOUT, RECEIVE_CUREENT_USER, RECEIVE_LOGIN, LOGIN_ERROR } from 'constants/user';


const initialState = Map({ isLoggedIn: false });

export const register = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_LOGOUT:
    newState = newState.set('isLoggedIn', false);
    newState = newState.set('username', '');
    newState = newState.delete('errorMessage');
    return newState;
  case LOGIN_ERROR:
    if (action.data !== undefined) {
      newState = newState.set('errorMessage', `error: ${action.data.slice(4)}`);
    }
    return newState;
  case RECEIVE_CUREENT_USER:
  case RECEIVE_LOGIN:
    if (typeof action.data.username !== 'undefined') {
      newState = newState.set('username', action.data.username);
      newState = newState.set('isLoggedIn', true);
    }
    return newState;
  case RECEIVE_REGISTER:
  default:
    return state;
  }
};

export const getIsLoggedIn = state => state.register.get('isLoggedIn');
export const getUsername = (state) => {
  if (state.register.get('isLoggedIn')) {
    return state.register.get('username');
  }
  return '';
};

