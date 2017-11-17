import { RECEIVE_REGISTER } from 'constants/user';
import { fetchDataIfNeeded } from 'actions/fetchApi';
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

// const login = data => ({
//   type: "LOGIN",
//   data,
// });

export const createUser = data =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/user/register', data, receiveRegister));
  };
