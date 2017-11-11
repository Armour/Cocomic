import { Map, getIn } from 'immutable'

import { RECEIVE_ERROR, RECEIVE_RESPONSE, START_REQUEST } from 'constants/fetchApi';

// store fetching urls and received error
const initialState = Map();

export const fetchingData = (state = initialState, action) => {
  switch (action.type) {
  case START_REQUEST:
    return state.set(action.url, {
      isFetching: true,
      error: null,
    });
  case RECEIVE_RESPONSE:
    return state.delete(action.url);
  case RECEIVE_ERROR:
    return state.set(action.url, {
      isFetching: false,
      error: action.error,
    });
  default:
    return state;
  }
};

export const isFetching = (url, state) => getIn(state, ['fetchingData', url, isFetching]) === true;
