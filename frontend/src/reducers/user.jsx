import { Map } from 'immutable';
import { RECEIVE_REGISTER } from 'constants/user';


const initialState = Map({ isLoggedIn: false });

export const register = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
  case RECEIVE_REGISTER:
    if (action.data.username) {
      newState = newState.set('username', action.data.username);
      newState = newState.set('isLoggedIn', true);
    }
    return newState;
  default:
    return state;
  }
};

export const getIsLoggedIn = state => state.register.get('isLoggedIn');
export const getUsername = (state) => {
  if (state.register.get('isLoggedIn')) {
    return state.register.get('username');
  }
  return '1';
};
