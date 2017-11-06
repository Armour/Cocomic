import React from 'react';
import { Intro } from 'components/Intro';
import { UserCard } from 'components/UserCard';

export class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Intro className="intro-panel" />
        <UserCard isRegister={false} />
      </div>
    );
  }
}
