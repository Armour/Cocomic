import { connect } from 'react-redux';
import { UserCard } from 'components/UserCard';
import { createUser, login } from 'actions/user';

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = dispatch => ({
  createUser: (data) => {
    dispatch(createUser(data));
  },
  login: (data) => {
    dispatch(login(data));
  },
});

export const User = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCard);
