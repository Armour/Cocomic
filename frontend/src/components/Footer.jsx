import React from 'react';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="footer-copyright">
          <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#">More Links</a>
          </div>
        </div>
      </footer>
    );
  }
}
