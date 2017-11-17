import React from 'react';
import { Intro } from 'components/Intro';
import { User } from 'containers/User';

export class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Intro className="intro-panel" />
        <User isRegister={false} />
      </div>
    );
  }
}
