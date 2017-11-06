import React from 'react';
import { Intro } from 'components/Intro';
import { UserCard } from 'components/UserCard';

export class RegisterPage extends React.Component {
  render() {
    return (
      <div>
        <Intro className="intro-panel" />
        <UserCard isRegister />
      </div>
    );
  }
}
