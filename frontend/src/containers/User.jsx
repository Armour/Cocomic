import { connect } from 'react-redux';
import { UserCard } from 'components/UserCard';
import { createUser } from 'actions/user';

function mapStateToProps(state, ownProps) {
  return {
    state,
    isRegister: ownProps.isRegister,
  };
}

const mapDispatchToProps = dispatch => ({
  createUser: (data) => {
    dispatch(createUser(data));
  },
  isRegister: true,
});

export const User = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCard);
