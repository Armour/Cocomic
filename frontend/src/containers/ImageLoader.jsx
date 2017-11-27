import { connect } from 'react-redux';

import { fetchImageIfNeeded } from 'actions/image';
import { ImageLoader } from 'components/ImageLoader';
import { getImage } from 'reducers/getImage';

const mapStateToProps = (state, ownProps) => ({
  img_data: getImage(state, ownProps.img_url),
  img_url: ownProps.img_url,
  alt: ownProps.alt,
});

const mapDispatchToProps = dispatch => ({
  fetchImageIfNeeded: (url) => {
    dispatch(fetchImageIfNeeded(url));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageLoader);
