import { RECEIVE_ERROR, RECEIVE_RESPONSE, START_REQUEST } from 'constants/actionTypes';

export const startRequest = url => ({
  type: START_REQUEST,
  url,
});

export const receiveResponse = (url, res) => ({
  type: RECEIVE_RESPONSE,
  url,
  res,
});

export const receiveError = (url, error) => ({
  type: RECEIVE_ERROR,
  url,
  error,
});

const fetchApiData = url =>
  async (dispatch) => {
    dispatch(startRequest(url));
    try {
      const req = new Request(`/${url}`, { method: 'POST' });
      const res = await fetch(req);
      if (res.ok) {
        res.json().then((data) => {
          dispatch(receiveResponse(url, data));
        });
      } else {
        dispatch(receiveError(url, `${res.status} ${res.statusText}`));
      }
    } catch (e) {
      dispatch(receiveError(url, e.message));
    }
  };

const shouldFetchApiData = (state, url) => {
  const apiData = state.apiData.get(url);
  return !apiData || !apiData.isFetching;
};

export const fetchApiDataIfNeeded = url =>
  (dispatch, getState) => {
    if (shouldFetchApiData(getState(), url)) {
      return dispatch(fetchApiData(url));
    }
    return null;
  };
