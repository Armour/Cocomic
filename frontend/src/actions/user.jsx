import { RECEIVE_REGISTER, RECEIVE_LOGOUT, RECEIVE_CUREENT_USER, RECEIVE_LOGIN } from 'constants/user';
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

export const createUser = data =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user/register', 'POST', data, receiveRegister));
  };

export const logout = () =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user/logout', 'GET', {}, receiveLogout));
  };

export const getUser = () =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user', 'GET', {}, receiveCurrentUser));
  };

export const login = data =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user/login', 'POST', data, receiveLogin));
    history.push('/');
  };
