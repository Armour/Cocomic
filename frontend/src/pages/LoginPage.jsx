import React from 'react';

export class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-wrapper">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Login </span>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s6">
                    <input id="email" type="email" className="validate" />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col s12">
                <a class="waves-effect waves-light btn">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
