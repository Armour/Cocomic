import React from 'react';
import Gallery from 'containers/Gallery';

export class PopularPage extends React.Component {
  componentDidMount() {
    $('#the-header').addClass('navbar-fixed');
  }
  render() {
    return (
      <div className="main-wrap">
        <h1 className="page-title">Popular</h1>
        <Gallery />
      </div>
    );
  }
}
