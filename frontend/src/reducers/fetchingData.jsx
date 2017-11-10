import { RECEIVE_ERROR, RECEIVE_RESPONSE, START_REQUEST } from 'constants';

// store fetching urls and received error
const initialState = {};

export const fetchingData = (state = initialState, action) => {
  switch (action.type) {
  case START_REQUEST:
    return state.set(action.url, {
      isFetching: true,
      error: null,
    });
  case RECEIVE_RESPONSE:
    return state.set(action.url, {
      isFetching: false,
      error: null,
    });
  case RECEIVE_ERROR:
    return state.set(action.url, {
      isFetching: false,
      error: action.error,
    });
  default:
    return state;
  }
};
