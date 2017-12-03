import React from 'react';
import PropTypes from 'prop-types';

function UserName(props) {
  if (!props.isRegister) {
    return null;
  }

  return (
    <div className="row">
      <div className="input-field col s12">
        <input id="user_name" type="text" className="validate" required="" aria-required="true" />
        <label htmlFor="user_name">User Name</label>
      </div>
    </div>
  );
}
UserName.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};

export class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.onClickRegister = this.register.bind(this);
    this.onClickLogin = this.login.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async register(e) {
    e.preventDefault();
    this.props.createUser({
      email: $('#email').val(),
      password: $('#password').val(),
      username: $('#user_name').val(),
    });
  }

  async login(e) {
    e.preventDefault();
    this.props.login({
      email: $('#email').val(),
      password: $('#password').val(),
    });
  }

  handleKeyDown(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.onClickRegister(e);
    }
  }

  render() {
    let submitBtn;
    if (this.props.isRegister) {
      submitBtn = <button id="create_account_btn" className="waves-effect waves-light btn blue" onClick={this.onClickRegister} onKeyDown={this.handleKeyDown}>Create Account</button>;
    } else {
      submitBtn = <button id="login_btn" className="waves-effect waves-light btn blue" onClick={this.onClickLogin} onKeyDown={this.handleKeyDown}>Login</button>;
    }
    return (
      <div className="name-card-wrapper">
        <div className="card">
          <div className="card-content">
            <span id="user_card_title" className="card-title center-align"> {this.props.isRegister ? 'Create Account' : 'Login'} </span>
            <div className="row">
              <form className="col s12">
                <UserName isRegister={this.props.isRegister} />
                {
                  this.props.state.register.get('errorMessage') && $('#email').value !== '' &&
                  <div className="row">
                    <div className="col s12">
                      <div className="user-error">
                        {this.props.state.register.get('errorMessage')}
                      </div>
                    </div>
                  </div>
                }
                <div className="row">
                  <div className="input-field col s12">
                    <input id="email" type="email" className="validate" />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col s12">
                {submitBtn}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UserCard.propTypes = {
  isRegister: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};
