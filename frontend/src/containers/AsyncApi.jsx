import { connect } from 'react-redux';

import { fetchApiDataIfNeeded } from 'actions';
import { ApiLoader } from 'components/ApiLoader';

const mapStateToProps = state => ({
  apiData: state.apiData,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (url) => {
    dispatch(fetchApiDataIfNeeded(url));
  },
});

export const AsyncApi = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApiLoader);
