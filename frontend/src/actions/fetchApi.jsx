import { RECEIVE_ERROR, RECEIVE_RESPONSE, START_REQUEST } from 'constants/fetchApi';
import { isFetching } from 'reducers/fetchingData';

export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';

const startRequest = (url, method) => ({
  type: START_REQUEST,
  url,
  method,
});

const receiveResponse = url => ({
  type: RECEIVE_RESPONSE,
  url,
});

export const defaultReceiveError = (url, res, error) => ({
  type: RECEIVE_ERROR,
  url,
  error,
});

const fetchData = (url, method, receiveData, receiveError) =>
  async (dispatch) => {
    dispatch(startRequest(url, method));
    try {
      const req = new Request(`${url}`, { method });
      const res = await fetch(req);
      if (res.ok) {
        res.json().then((data) => {
          dispatch(receiveData(data));
        });
      } else {
        dispatch(receiveError(url, res, `${res.status} ${res.statusText}`));
      }
    } catch (e) {
      dispatch(receiveError(url, null, e.message));
    } finally {
      dispatch(receiveResponse(url));
    }
  };

/*
fetchDataIfNeeded prevents duplicate fetch request to same url at the same time
*/
export const fetchDataIfNeeded = (url, method, receiveData, receiveError = defaultReceiveError) =>
  (dispatch, getState) => {
    const state = getState();
    if (!isFetching(url, state)) {
      return dispatch(fetchData(url, method, receiveData, receiveError));
    }
    return null;
  };
