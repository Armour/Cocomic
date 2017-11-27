import { METHOD_GET, fetchDataIfNeeded } from 'actions/fetchApi';
import { RECEIVE_USER_COLLECTIONS, RECEIVE_FAVORATES, TOGGLE_USER_CENTER_TAB, TO_FAVORATES, TO_COLLECTIONS } from 'constants/userCenter';

const receiveFavorates = data => ({
  type: RECEIVE_FAVORATES,
  data,
});

const receiveUserCollections = data => ({
  type: RECEIVE_USER_COLLECTIONS,
  data,
});

export const toggleUserCenterTab = () => ({
  type: TOGGLE_USER_CENTER_TAB,
});

export const toFavorates = () => ({
  type: TO_FAVORATES,
});

export const toCollections = () => ({
  type: TO_COLLECTIONS,
});


const fetchUserCollections = () =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/book/userCollections', METHOD_GET, {}, receiveUserCollections));
  };

const fetchUserFavorates = () =>
  (dispatch) => {
    dispatch(fetchDataIfNeeded('/book/userFavorates', METHOD_GET, {}, receiveFavorates));
  };

export const fetchUserCenterBooks = () =>
  (dispatch, getState) => {
    if (getState().userCenter.get('isCollection')) {
      dispatch(fetchUserCollections());
    } else {
      dispatch(fetchUserFavorates());
    }
  };
