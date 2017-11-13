import { RECEIVE_ERROR, RECEIVE_RESPONSE, START_REQUEST } from 'constants/fetchApi';
import { isFetching } from 'reducers/fetchingData';

const startRequest = url => ({
  type: START_REQUEST,
  url,
});

const receiveResponse = url => ({
  type: RECEIVE_RESPONSE,
  url,
});

export const defaultReceiveError = (url, error) => ({
  type: RECEIVE_ERROR,
  url,
  error,
});

const fetchData = (url, receiveData, receiveError) =>
  async (dispatch) => {
    dispatch(startRequest(url));
    try {
      const req = new Request(`/${url}`, { method: 'POST' });
      const res = await fetch(req);
      if (res.ok) {
        res.json().then((data) => {
          dispatch(receiveData(data));
          dispatch(receiveResponse(url));
        });
      } else {
        dispatch(receiveError(url, `${res.status} ${res.statusText}`));
      }
    } catch (e) {
      dispatch(receiveError(url, e.message));
    }
  };

/*
fetchDataIfNeeded prevents duplicate fetch request to same url at the same time
*/
export const fetchDataIfNeeded = (url, receiveData, receiveError = defaultReceiveError) =>
  (dispatch, getState) => {
    const state = getState();
    if (!isFetching(url, state)) {
      return dispatch(fetchData(url, receiveData, receiveError));
    }
    return null;
  };
