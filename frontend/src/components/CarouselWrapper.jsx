import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from 'components/Carousel';
import { getChapter } from 'reducers/books';

export class CarouselWrapper extends React.Component {
  constructor(props) {
    super(props);
    const selectedChapterId = this.props.selectedChapterId ? this.props.selectedChapterId : this.props.childrenIds.get(0);
    const chapter = getChapter(props.book, selectedChapterId);
    this.state = {
      branchTitle: chapter.get('title'),
      branchDescription: chapter.get('description'),
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(index) {
    const chapterId = this.props.childrenIds.get(index);
    const chapter = getChapter(this.props.book, chapterId);
    this.setState({ branchTitle: chapter.get('title'), branchDescription: chapter.get('description') });
    this.props.selectBranch(chapterId);
  }

  render() {
    return (
      <div id={this.props.chapterId}>
        <Carousel {...this.props} selectItem={this.selectItem} />
        <p id="next-chapter-title" className="next-chapter-info" >{this.state.branchTitle}</p>
        <p id="next-chapter-description" className="next-chapter-info">{this.state.branchDescription}</p>
      </div>
    );
  }
}

CarouselWrapper.propTypes = {
  book: PropTypes.object.isRequired,
  chapterId: PropTypes.number.isRequired,
  selectedChapterId: PropTypes.number,
  selectBranch: PropTypes.func.isRequired,
  childrenIds: PropTypes.object,
};

CarouselWrapper.defaultProps = {
  selectedChapterId: undefined,
  childrenIds: undefined,
};
