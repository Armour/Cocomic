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

const receiveResponse = (url, method) => ({
  type: RECEIVE_RESPONSE,
  url,
  method,
});

export const defaultReceiveError = (url, error) => ({
  type: RECEIVE_ERROR,
  url,
  error,
});

const fetchData = (url, method, postData, receiveData, receiveError) =>
  async (dispatch) => {
    dispatch(startRequest(url, method));
    try {
      let req;
      if (method.toUpperCase() === METHOD_POST) {
        req = new Request(`/fetch${url}`, {
          method: METHOD_POST,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
          credentials: 'same-origin',
        });
      } else {
        req = new Request(`/fetch${url}`, {
          method,
          credentials: 'same-origin',
        });
      }
      const res = await fetch(req);
      if (res.ok) {
        res.json().then((data) => {
          dispatch(receiveData(data));
        }).catch(() => {
          // no content
          dispatch(receiveData());
        });
      } else {
        res.json().then((e) => {
          dispatch(receiveError(url, `${res.status} ${e.message}`));
        });
      }
    } catch (e) {
      dispatch(receiveError(url, e.message));
    } finally {
      dispatch(receiveResponse(url, method));
    }
  };

/*
fetchDataIfNeeded prevents duplicate fetch request to same url at the same time
*/
export const fetchDataIfNeeded = (url, method, postData, receiveData, receiveError = defaultReceiveError) =>
  (dispatch, getState) => {
    const state = getState();
    if (!isFetching(url, method, state)) {
      return dispatch(fetchData(url, method, postData, receiveData, receiveError));
    }
    return null;
  };

