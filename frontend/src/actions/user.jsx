import { RECEIVE_REGISTER, RECEIVE_LOGOUT, RECEIVE_CUREENT_USER, RECEIVE_LOGIN, LOGIN_ERROR } from 'constants/user';
import { fetchDataIfNeeded } from 'actions/fetchApi';
import history from '../history';
/*
data : {
  receiveRegister: {
    user_name: string, email: string, password: string
  },
  login: {
    email: string, password: string
  }
}
*/

const receiveRegister = data => ({
  type: RECEIVE_REGISTER,
  data,
});

const receiveLogout = data => ({
  type: RECEIVE_LOGOUT,
  data,
});

const receiveCurrentUser = data => ({
  type: RECEIVE_CUREENT_USER,
  data,
});

const receiveLogin = data => ({
  type: RECEIVE_LOGIN,
  data,
});

const loginError = (url, data) => ({
  type: LOGIN_ERROR,
  data,
});

export const createUser = data =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user/register', 'POST', data, receiveRegister));
    history.push('/login');
  };

export const logout = () =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user/logout', 'GET', {}, receiveLogout));
    history.push('/login');
  };

export const getUser = () =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user', 'GET', {}, receiveCurrentUser));
  };

export const login = data =>
  async (dispatch, getState) => {
    try {
      await dispatch(fetchDataIfNeeded('/user/login', 'POST', data, receiveLogin, loginError));
      if (getState().register.get('isLoggedIn') === true) {
        history.push('/userCenter');
      }
    } catch (e) {
      history.push('/login');
    }
  };
