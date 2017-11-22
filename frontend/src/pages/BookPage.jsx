import React from 'react';
import PropTypes from 'prop-types';

import Book from 'containers/Book';

export class BookPage extends React.Component {
  render() {
    return (
      <div className="main-wrap">
        <Book bookId={parseInt(this.props.match.params.bookId, 10)} currentChapterId={parseInt(this.props.location.hash, 10, 10)} />
      </div>
    );
  }
}

BookPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
