import React from 'react';

export class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="main-wrap">
        <h1>Page 404</h1>
        <img className="re-zero" src={require('../image/rezero.png')} alt="rezero" />
        <img className="re-zero" src={require('../image/rezero.png')} alt="rezero" />
      </div>
    );
  }
}
