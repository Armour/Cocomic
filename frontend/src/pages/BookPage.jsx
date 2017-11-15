import React from 'react';
import PropTypes from 'prop-types';

import Book from 'containers/Book';

export class BookPage extends React.Component {
  render() {
    return (
      <div>
        <Book bookId={this.props.match.params.bookId} />
      </div>
    );
  }
}

BookPage.propTypes = {
  match: PropTypes.object.isRequired,
};
