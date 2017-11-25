import React from 'react';
import Gallery from 'containers/Gallery';

export class NewestPage extends React.Component {
  componentDidMount() {
    $('#the-header').addClass('navbar-fixed');
  }
  render() {
    return (
      <div className="main-wrap">
        <h1 className="page-title">New</h1>
        <Gallery orderType={1} />
      </div>
    );
  }
}
