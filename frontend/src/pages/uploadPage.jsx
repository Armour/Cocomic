import React from 'react';
import UploadImage from 'containers/UploadImage';

export class FilePage extends React.Component {
  componentDidMount() {
    $('#the-header').addClass('navbar-fixed');
  }
  render() {
    return (
      <div className="main-wrap">
        <UploadImage />
      </div>
    );
  }
}
