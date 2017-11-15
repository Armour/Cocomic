import React from 'react';
import PropTypes from 'prop-types';

import { Chapter } from 'components/Chapter';

export class Book extends React.Component {
  componentWillMount() {
    this.props.fetchBookIfNeeded(this.props.bookId);
  }

  render() {
    return (
      <div>
        <Chapter />
        <Chapter />
        <Chapter />
      </div>
    );
  }
}

Book.propTypes = {
  bookId: PropTypes.string.isRequired,
  fetchBookIfNeeded: PropTypes.func.isRequired,
};
