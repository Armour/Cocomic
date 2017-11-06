import React from 'react';
import PropTypes from 'prop-types';

function UserName(props) {
  if (!props.isRegister) {
    return null;
  }

  return (
    <div className="row">
      <div className="input-field col s12">
        <input id="user_name" type="text" className="validate" />
        <label htmlFor="user_name">User Name</label>
      </div>
    </div>
  );
}
UserName.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};

export function UserCard(props) {
  return (
    <div className="name-card-wrapper">
      <div className="row valign-wrapper">
        <div className="col s6 offset-s3 valign">
          <div className="card">
            <div className="card-content">
              <span id="user_card_title" className="card-title center-align"> {props.isRegister ? 'Create Account' : 'Login'} </span>
              <div className="row">
                <form className="col s12">
                  <UserName isRegister={props.isRegister} />
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
                  <a id="user_card_btn" className="waves-effect waves-light btn">{props.isRegister ? 'Create Account' : 'Login'}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
UserCard.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};