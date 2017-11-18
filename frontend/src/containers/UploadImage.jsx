import { connect } from 'react-redux';
import { imageInsert, imageUpload, imageRemove } from 'actions/UploadImage';
import { FileUploadBox } from 'components/FileUploadBox';

const mapStateToProps = (state) => {
  if (state.images) {
    const ids = [];
    const files = [];
    const imagePreviewUrls = [];
    /* const widths = [];
    const heights = []; */
    state.images.valueSeq().forEach((value) => {
      ids.push(value.get('id'));
      files.push(value.get('file'));
      imagePreviewUrls.push(value.get('imagePreviewUrl'));
      /* widths.push(value.get('imgWidth'));
      heights.push(value.get('imgHeight')); */
    });
    return {
      id: ids,
      file: files,
      imagePreviewUrl: imagePreviewUrls,
      /* width: widths,
      height: heights, */
    };
  }
  return {
    id: [],
    file: [],
    imagePreviewUrl: [],
    /* width: [],
    height: [], */
  };
};

const mapDispatchToProps = dispatch => ({
  imageInsert: (data) => {
    dispatch(imageInsert(data));
  },
  imageUpload: (data) => {
    dispatch(imageUpload(data));
  },
  imageRemove: (imgId) => {
    dispatch(imageRemove(imgId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileUploadBox);
