import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  componentDidUpdate() {
    if (this.loadingTop) {
      let scrollHeight = document.body.scrollHeight;
      window.scrollTo(window.pageXOffset, this.pageYOffset + (scrollHeight - this.scrollHeight));
    }
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  componentWillUpdate() {
    const node = window;
    let scrollHeight = document.body.scrollHeight;
    this.scrollHeight = scrollHeight;
    this.pageYOffset = node.pageYOffset;
  }

  // Set a defaut loader for all your `InfiniteScroll` components
  setDefaultLoader(loader) {
    this.defaultLoader = loader;
  }

  detachScrollListener() {
    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.removeEventListener(
      'scroll',
      this.scrollListener,
      this.props.useCapture,
    );
    scrollEl.removeEventListener(
      'resize',
      this.scrollListener,
      this.props.useCapture,
    );
  }

  attachScrollListener() {
    if (!this.props.hasMore && !this.props.hasPrev) {
      return;
    }

    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
      this.props.useCapture,
    );
    scrollEl.addEventListener(
      'resize',
      this.scrollListener,
      this.props.useCapture,
    );

    if (this.props.initialLoad) {
      this.scrollListener();
    }
  }

  scrollListener() {
    const el = this.scrollComponent;
    const scrollEl = window;

    let offsetBottom, offsetTop;
    if (this.props.useWindow) {
      const doc =
        document.documentElement || document.body.parentNode || document.body;
      const scrollTop =
        scrollEl.pageYOffset !== undefined
          ? scrollEl.pageYOffset
          : doc.scrollTop;
      offsetTop = scrollTop;
      offsetBottom =
        this.calculateTopPosition(el) +
        (el.offsetHeight - scrollTop - window.innerHeight);
    } else {
      offsetTop = el.parentNode.scrollTop;
      offsetBottom =
        el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
    }

    if (this.props.hasMore && offsetBottom < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.loadingTop = false;
      // Call loadMore after detachScrollListenher to allow for non-async loadMore functions
      if (typeof this.props.loadMore === 'function') {
        this.props.loadMore((this.pageLoaded += 1));
      }
    }

    if (this.props.hasPrev && offsetTop < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.loadingTop = true;
      // loadPrev
      if (typeof this.props.loadPrev === 'function') {
        this.props.loadPrev((this.pageLoaded += 1));
      }
    }
  }

  calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  render() {
    const {
      children,
      element,
      hasMore,
      hasPrev,
      initialLoad,
      isReverse,
      loader,
      loadMore,
      loadPrev,
      pageStart,
      ref,
      threshold,
      useCapture,
      useWindow,
      ...props
    } = this.props;

    props.ref = node => {
      this.scrollComponent = node;
      if (ref) {
        ref(node);
      }
    };

    const childrenArray = [children];
    if (hasMore) {
      if (loader) {
        childrenArray.push(loader);
      } else if (this.defaultLoader) {
        childrenArray.push(this.defaultLoader);
      }
    }
    if (hasPrev) {
      if (loader) {
        childrenArray.unshift(loader);
      } else if (this.defaultLoader) {
        childrenArray.unshift(this.defaultLoader);
      }
    }
    return React.createElement(element, props, ...childrenArray);
  }
}

InfiniteScroll.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  element: PropTypes.string,
  hasMore: PropTypes.bool,
  hasPrev: PropTypes.bool,
  initialLoad: PropTypes.bool,
  isReverse: PropTypes.bool,
  loader: PropTypes.object,
  loadMore: PropTypes.func.isRequired,
  loadPrev: PropTypes.func.isRequired,
  pageStart: PropTypes.number,
  ref: PropTypes.func,
  threshold: PropTypes.number,
  useCapture: PropTypes.bool,
  useWindow: PropTypes.bool,
};

InfiniteScroll.defaultProps = {
  element: 'div',
  hasMore: false,
  hasPrev: false,
  initialLoad: true,
  pageStart: 0,
  ref: null,
  threshold: 250,
  useWindow: true,
  isReverse: false,
  useCapture: false,
  loader: null,
};
