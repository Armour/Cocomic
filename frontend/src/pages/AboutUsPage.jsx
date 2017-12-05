import React from 'react';

export class AboutUsPage extends React.Component {
  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col s12 m12 l12">
          <div>
          <h2>About Us</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-image">
              <img src={require('../image/chong.jpg')} alt="Chong Guo" />
            </div>
            <div className="card-content">
              <span className="card-title">Chong Guo</span>
            </div>
          </div>
        </div>
        <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-image">
              <img src={require('../image/zip.jpg')} alt="Zip" />
            </div>
            <div className="card-content">
              <span className="card-title">Zip</span>
            </div>
          </div>
        </div>
        <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-image">
              <img src={require('../image/mao.jpg')} alt="Ruijia Mao" />
            </div>
            <div className="card-content">
              <span className="card-title">Ruijia(Alan) Mao</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-image">
              <img src={require('../image/luyor.jpg')} alt="Yuhe Lu" />
            </div>
            <div className="card-content">
              <span className="card-title">Yuhe Lu</span>
            </div>
          </div>
        </div>  
        <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-image">
              <img src={require('../image/kingston.jpg')} alt="Jingda Chen" />
            </div>
            <div className="card-content">
              <span className="card-title">Jingda(Kingston) Chen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
