import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

import InfiniteScroll from 'utils/libs/infiniteScroll';
import { Chapter } from 'components/Chapter';
import { BookCoverCard } from 'components/BookCoverCard';

export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchBookIfNeeded(this.props.bookId);
    this.state = {
      loadedChapters: [],
      toRoot: [],
      toLeaf: [],
    };

    this.loadNext = this.loadNext.bind(this);
    this.loadPrev = this.loadPrev.bind(this);
    this.selectBranch = this.selectBranch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loadedChapters.length === 0 && nextProps.startingChapterId) {
      this.setState({
        loadedChapters: [nextProps.startingChapterId],
        toRoot: nextProps.traverseToRoot(nextProps.startingChapterId),
        toLeaf: nextProps.traverseToLeaf(nextProps.startingChapterId),
      });
    }
  }

  selectBranch(chapterId, branchChapterId) {
    this.setState((prevState) => {
      const index = prevState.loadedChapters.indexOf(chapterId);
      return {
        loadedChapters: [...prevState.loadedChapters.slice(0, index + 1), branchChapterId],
        toLeaf: this.props.traverseToLeaf(branchChapterId),
      };
    });
  }

  loadNext() {
    this.setState((prevState) => {
      if (prevState.toLeaf.length > 0) {
        return {
          loadedChapters: [...prevState.loadedChapters, prevState.toLeaf[0]],
          toLeaf: prevState.toLeaf.slice(1),
        };
      }
      return prevState;
    });
  }

  loadPrev() {
    this.setState((prevState) => {
      if (prevState.toRoot.length > 0) {
        return {
          loadedChapters: [prevState.toRoot[prevState.toRoot.length - 1], ...prevState.loadedChapters],
          toRoot: prevState.toRoot.slice(0, -1),
        };
      }
      return prevState;
    });
  }

  render() {
    const loadedChaptersComp = this.state.loadedChapters.map((chapterId) => {
      const chapter = this.props.getChapter(chapterId);
      return (
        <Scroll.Element key={chapterId} name={chapterId.toString()}>
          <Scroll.Link to={chapter.get('id').toString()} spy hashSpy hidden isDynamic />
          <div>
            {chapter.get('parentId') === 0 &&
              <BookCoverCard img_url={this.props.coverUrl} title={this.props.title} description={this.props.description} />
            }
            <Chapter
              chapterId={chapter.get('id')}
              title={chapter.get('title')}
              pictures={chapter.get('images')}
              isLiked={chapter.get('isliked') === '1'}
              likeChapter={this.props.likeChapter}
              getChapter={this.props.getChapter}
              selectBranch={branchChapterId => this.selectBranch(chapterId, branchChapterId)}
            />
          </div>
        </Scroll.Element>
      );
    });
    return (
      <InfiniteScroll
        hasMore={this.state.toLeaf.length > 0}
        hasPrev={this.state.toRoot.length > 0}
        loader={<div className="loader">Loading ...</div>}
        loadMore={this.loadNext}
        loadPrev={this.loadPrev}
      >
        {loadedChaptersComp}
      </InfiniteScroll>
    );
  }
}

Book.propTypes = {
  bookId: PropTypes.number.isRequired,
  traverseToRoot: PropTypes.func,
  traverseToLeaf: PropTypes.func,
  getChapter: PropTypes.func,
  fetchBookIfNeeded: PropTypes.func.isRequired,
  likeChapter: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  coverUrl: PropTypes.string,
  // likeNum: PropTypes.number,
  startingChapterId: PropTypes.number,
};

Book.defaultProps = {
  // currentChapterId: 0,
  title: '',
  description: '',
  coverUrl: '',
  // likeNum: 0,
  startingChapterId: undefined,
  traverseToRoot: undefined,
  traverseToLeaf: undefined,
  getChapter: undefined,
};
