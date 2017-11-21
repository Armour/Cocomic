import { Map, getIn } from 'immutable';

import { RECEIVE_RESPONSE, START_REQUEST } from 'constants/fetchApi';

// store fetching urls and received error
const initialState = Map();

export const fetchingData = (state = initialState, action) => {
  switch (action.type) {
  case START_REQUEST:
    return state.set(`${action.method} ${action.url}`, true);
  case RECEIVE_RESPONSE:
    return state.delete(`${action.method} ${action.url}`);
  default:
    return state;
  }
};

export const isFetching = (url, method, state) => getIn(state, ['fetchingData', `${method} ${url}`]) === true;
