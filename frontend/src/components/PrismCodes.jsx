import React from 'react';
import PropTypes from 'prop-types';

import { highlightElement } from 'prismjs';

export class PrismCodes extends React.Component {
  constructor(props) {
    super(props);
    this.highlightCode = this.highlightCode.bind(this);
  }

  highlightCode(code) {
    this.setState({ code }, () => {
      highlightElement(this.state.code, false);
    });
  }

  render() {
    return (
      <pre className={this.props.language}>
        <code className={`col s12 ${this.props.language}`} ref={this.highlightCode}>
          {this.props.children}
        </code>
      </pre>
    );
  }
}

PrismCodes.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
