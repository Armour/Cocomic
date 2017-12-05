import React from 'react';

export class AboutUsPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="col s12 m3 center-on-small-only">
              <div className="image-container">
                <img src={require('../image/kingston.jpg')} alt="Chong Guo" />
              </div>
            </div>
            <div className="col s12 m9">
              <h4>Chong Guo</h4>
              <p>...</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 center-on-small-only">
              <div className="image-container">
                <img src={require('../image/mao.jpg')} alt="Chong Guo" />
              </div>
            </div>
            <div className="col s12 m9">
              <h4>Chong Guo</h4>
              <p>...</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 center-on-small-only">
              <div className="image-container">
                <img src={require('../image/zip.jpg')} alt="Chong Guo" />
              </div>
            </div>
            <div className="col s12 m9">
              <h4>Chong Guo</h4>
              <p>...</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 center-on-small-only">
              <div className="image-container">
                <img src={require('../image/kingston.jpg')} alt="Chong Guo" />
              </div>
            </div>
            <div className="col s12 m9">
              <h4>Chong Guo</h4>
              <p>...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
