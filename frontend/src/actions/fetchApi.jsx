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

const fetchData = (url, postData, receiveData, receiveError) =>
  async (dispatch) => {
    dispatch(startRequest(url));
    try {
      const req = new Request(`${url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(postData) });
      const res = await fetch(req);
      if (res.ok) {
        res.json().then((data) => {
          dispatch(receiveData(data));
          dispatch(receiveResponse(url));
        });
      } else if (typeof res.error !== 'undefined') {
        dispatch(receiveError(url, `${res.status} ${res.statusText} ${res.error}`));
      } else {
        dispatch(receiveError(url, `${res.status} ${res.statusText} error message undefined`));
      }
    } catch (e) {
      dispatch(receiveError(url, e.message));
    }
  };

/*
fetchDataIfNeeded prevents duplicate fetch request to same url at the same time
*/
export const fetchDataIfNeeded = (url, postData, receiveData, receiveError = defaultReceiveError) =>
  (dispatch, getState) => {
    const state = getState();
    if (!isFetching(url, state)) {
      return dispatch(fetchData(url, postData, receiveData, receiveError));
    }
    return null;
  };

