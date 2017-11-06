import React from 'react';

export class ComicCard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src={require('../image/sample-1.jpg')} alt="comic-cover" />
              <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
            </div>
            <div className="card-content">
              <span className="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
