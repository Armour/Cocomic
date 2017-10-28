import { connect } from 'react-redux';

import { setVisibilityFilter } from 'actions';
import { TodoLink } from 'components/TodoLink';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

export const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoLink);
